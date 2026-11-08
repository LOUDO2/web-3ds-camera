<script lang="ts">

    import PhotoFrameLarge from "#lib/assets/images/media/photo-frame-large.png"
    import PhotoFrameMedium from "#lib/assets/images/media/photo-frame-medium.png"
    import PhotoFrameSmall from "#lib/assets/images/media/photo-frame-small.png"
    import VideoFrameLarge from "#lib/assets/images/media/video-strip-large.png"
    import VideoFrameMedium from "#lib/assets/images/media/video-strip-medium.png"
    import VideoFrameSmall from "#lib/assets/images/media/video-strip-small.png"
    import SelectedLarge from "#lib/assets/images/media/selected-large.png"
    import SelectedMedium from "#lib/assets/images/media/selected-medium.png"
    import SelectedSmall from "#lib/assets/images/media/selected-small.png"
    import EmptySlot from "#lib/assets/images/media/empty-slot-large.png"
    import type { MediaType } from "#lib/assets/types.ts";
    import { isZooming } from "#lib/stores/zoomingAnim.svelte.ts";

    let { id, url, selected = false, isVideo = false, changeSelected, zoomMode }: MediaType = $props();

    const SPRITES = {
        1: { photo: PhotoFrameLarge, video: VideoFrameLarge, selected: SelectedLarge, w: 66, h: 52 },
        2: { photo: PhotoFrameMedium, video: VideoFrameMedium, selected: SelectedMedium, w: 50, h: 40 },
        3: { photo: PhotoFrameSmall, video: VideoFrameSmall, selected: SelectedSmall, w: 42, h: 34 },
    } as const;

    let sprites = $derived(SPRITES[zoomMode as 1 | 2 | 3] ?? SPRITES[1]);

</script>

<button class="frame" class:empty={!url} style="--w: {sprites.w}; --h: {sprites.h}" onclick={() => changeSelected(id, true)}>
    {#if !url}
        <img src={EmptySlot} alt="" class="border {isZooming() && "hidden"}" />
    {:else}
        {#if isVideo}
            <video src={url} class="media" muted playsinline preload="metadata"></video>
        {:else}
            <img src={url} alt="" class="media" />
        {/if}
        <img src={isVideo ? sprites.video : sprites.photo} alt="" class="border" />
    {/if}
    {#if selected}
        <img src={sprites.selected} alt="" class="selected" />
    {/if}
    <div class="white"></div>
</button>

<style lang="scss">
    .frame {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 50ms, opacity 50ms;

        &:not(.empty):active {
            transform: translate(5px, 5px);
            opacity: 0.8;
        }

        .hidden {
            display: none;
        }

        .media {
            position: absolute;
            left: calc(4 / var(--w) * 100%);
            top: calc(4 / var(--h) * 100%);
            width: calc((var(--w) - 10) / var(--w) * 100%);
            height: calc((var(--h) - 10) / var(--h) * 100%);
            object-fit: cover;
        }

        .border {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            image-rendering: pixelated;
        }

        .selected {
            position: absolute;
            left: calc(-3 / var(--w) * 100%);
            top: calc(-3 / var(--h) * 100%);
            width: calc((var(--w) + 6) / var(--w) * 100%);
            height: calc((var(--h) + 6) / var(--h) * 100%);
            image-rendering: pixelated;
        }
    }
</style>
