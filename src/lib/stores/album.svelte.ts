import Cat from "#lib/assets/images/placeholders/cat.png"
import Cat2 from "#lib/assets/images/placeholders/cat_2.png"
import Cat3 from "#lib/assets/images/placeholders/cat_3.png"
import Cat4 from "#lib/assets/images/placeholders/nya.mp4"
import { settings } from "./settings.svelte.ts";
import type { AlbumMedia } from "#lib/assets/types.ts";
import { loadFiles, saveFiles } from "#lib/media-db.ts";
import { browser } from "$app/env";

const PER_PAGE: Record<number, number> = { 1: 6, 2: 12, 3: 20 };
const MOMENTUM_MS = 250;
const SETTLE_MS = 70;

export const album = $state({
    medias: [
        { url: Cat, type: "photo" },
        { url: Cat2, type: "photo" },
        { url: Cat3, type: "photo" },
        { url: Cat4, type: "video" },
    ] as AlbumMedia[],
    scroll: 0,
    selected: -1
});

function toMedia(file: Blob): AlbumMedia {
    return {
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" : "photo"
    };
}

export async function importMedias(files: File[]) {
    album.medias.push(...files.map(toMedia));
    await saveFiles(files);
}

if (browser) {
    loadFiles().then((files) => album.medias.push(...files.map(toMedia)));
}

let target = 0;
let frame = 0;

export function perPage() {
    return PER_PAGE[settings.zoomMode] ?? 6;
}

export function pageCount() {
    return Math.max(1, Math.ceil(album.medias.length / perPage()));
}

export function maxScroll() {
    return pageCount() - 1;
}

export function rate(page = album.scroll) {
    return maxScroll() === 0 ? 0 : page / maxScroll();
}

export function selectedRate() {
    return rate(Math.floor(album.selected / perPage()));
}

function clamp(page: number) {
    return Math.min(Math.max(page, 0), maxScroll());
}

function animate() {
    cancelAnimationFrame(frame);
    let last = performance.now();
    const tick = (now: number) => {
        album.scroll += (target - album.scroll) * (1 - Math.exp(-(now - last) / SETTLE_MS));
        last = now;
        if (Math.abs(target - album.scroll) < 0.001) {
            album.scroll = target;
            return;
        }
        frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
}

export function scrollTo(page: number) {
    target = clamp(Math.round(page));
    animate();
}

export function step(direction: number) {
    scrollTo(target + direction);
}

export function jumpTo(page: number) {
    cancelAnimationFrame(frame);
    target = clamp(Math.round(page));
    album.scroll = target;
}

export function dragBy(pages: number) {
    cancelAnimationFrame(frame);
    album.scroll = clamp(album.scroll + pages);
    target = album.scroll;
}

export function release(pagesPerMs: number) {
    scrollTo(album.scroll + pagesPerMs * MOMENTUM_MS);
}

export function setZoom(mode: number) {
    const first = target * perPage();
    settings.zoomMode = mode;
    jumpTo(Math.floor(first / perPage()));
}
