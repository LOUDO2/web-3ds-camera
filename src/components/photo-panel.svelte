<script lang="ts">

    import Media from "./media.svelte";
    import MediaModal from "./media-modal.svelte";
    import { settings } from "#lib/stores/settings.svelte.ts";
    import { ZOOM_DURATION } from "#lib/stores/zoomingAnim.svelte.ts";
    import { album, dragBy, pageCount, perPage, release, scrollTo } from "#lib/stores/album.svelte.ts";
    import { velocityTracker } from "#lib/drag.ts";

    const DRAG_THRESHOLD = 6;

    let viewport: HTMLDivElement;
    let strip: HTMLDivElement;
    let before: DOMRect[] = [];

    function frames() {
        return Array.from(strip.querySelectorAll(".photos > *"));
    }

    $effect.pre(() => {
        settings.zoomMode;
        if (!strip) return;
        before = frames().map((el) => el.getBoundingClientRect());
    });

    $effect(() => {
        settings.zoomMode;
        frames().forEach((el, i) => {
            const from = before[i];
            if (!from) return;
            const to = el.getBoundingClientRect();
            el.animate([
                {
                    transformOrigin: "top left",
                    transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`
                },
                { transformOrigin: "top left", transform: "none" }
            ], { duration: ZOOM_DURATION, easing: "linear" });
        });
        before = [];
    });

    let modalOpen = $state(false);

    function changeSelected(id: number, openModal: boolean) {
        album.selected = id;
        scrollTo(Math.floor(id / perPage()));
        if (openModal) {
            modalOpen = album.medias[id] !== undefined;
        }
    }

    let pages = $derived(Array.from({ length: pageCount() }, (_, page) =>
        Array.from({ length: perPage() }, (_, i) => page * perPage() + i)
    ));

    function handleKeydown(event: KeyboardEvent) {
        const last = pageCount() * perPage() - 1;
        switch (event.key) {
            case "ArrowRight":
                changeSelected(Math.min(album.selected + 1, last), false);
                break;
            case "ArrowLeft":
                changeSelected(Math.max(album.selected - 1, 0), false);
                break;
            case "Enter":
                changeSelected(album.selected, true);
                break;
            case "Escape":
                modalOpen = false;
                break;
        }
    }

    const tracker = velocityTracker();
    let pointerId = -1;
    let startX = 0;
    let dragging = false;

    function onpointerdown(event: PointerEvent) {
        pointerId = event.pointerId;
        startX = event.clientX;
        dragging = false;
        tracker.start(event.clientX);
    }

    function onpointermove(event: PointerEvent) {
        if (event.pointerId !== pointerId) return;
        if (!dragging) {
            if (Math.abs(event.clientX - startX) < DRAG_THRESHOLD) return;
            dragging = true;
            viewport.setPointerCapture(event.pointerId);
        }
        dragBy(-tracker.move(event.clientX) / viewport.clientWidth);
    }

    function onpointerup(event: PointerEvent) {
        if (event.pointerId !== pointerId) return;
        pointerId = -1;
        if (dragging) release(-tracker.end() / viewport.clientWidth);
    }

</script>

<svelte:window onkeydown={handleKeydown} />

<div
    class="photo-panel"
    bind:this={viewport}
    role="presentation"
    {onpointerdown}
    {onpointermove}
    {onpointerup}
    onpointercancel={onpointerup}
    ondragstart={(e) => e.preventDefault()}
>
    <div class="strip" bind:this={strip} style:translate="{-album.scroll * 100}% 0">
        {#each pages as page (page[0])}
            <div class="page">
                <div class="bg">
                    <div class="photos zoom-{settings.zoomMode}">
                        {#each page as index (index)}
                            <Media id={index} url={album.medias[index]} selected={index === album.selected} changeSelected={changeSelected} zoomMode={settings.zoomMode} />
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

{#if modalOpen && album.selected !== -1}
    <MediaModal url={album.medias[album.selected]} index={album.selected} count={album.medias.length} changeSelected={changeSelected} onclose={() => modalOpen = false} />
{/if}

<style lang="scss">

    .photo-panel {
        overflow: hidden;
        touch-action: none;
        user-select: none;

        .strip {
            display: flex;
        }

        .page {
            flex: 0 0 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .bg {
            width: calc(100% * 300 / 320);
            aspect-ratio: 256 / 160;
            background: url("../lib/assets/images/ui/photo-panel.png") center / 100% 100% no-repeat;
            image-rendering: pixelated;
            position: relative;
            container-type: inline-size;
        }

        .photos {
            --px: calc(100cqw / 256);
            position: absolute;
            display: grid;

            @each $zoom, $cols, $w, $h, $col-gap, $row-gap, $left, $top in
                (1, 3, 66, 52, 10, 14, 19, 21),
                (2, 4, 50, 40, 6, 3, 19, 17),
                (3, 5, 42, 34, 4, 0, 15, 12)
            {
                &.zoom-#{$zoom} {
                    grid-template-columns: repeat($cols, calc($w * var(--px)));
                    grid-auto-rows: calc($h * var(--px));
                    column-gap: calc($col-gap * var(--px));
                    row-gap: calc($row-gap * var(--px));
                    left: calc($left * var(--px));
                    top: calc($top * var(--px));
                }
            }
        }
    }

</style>
