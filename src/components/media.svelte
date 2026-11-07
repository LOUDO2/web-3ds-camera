<script lang="ts">

    import PhotoFrameLarge from "#lib/assets/images/media/photo-frame-large.png"
    import VideoFrameLarge from "#lib/assets/images/media/video-strip-large.png"
    import SelectedImage from "#lib/assets/images/media/selected-large.png"
    import EmptySlot from "#lib/assets/images/media/empty-slot-large.png"
    import type { MediaType } from "#lib/assets/types.ts";

    let { id, url, selected = false, isVideo = false, changeSelected }: MediaType = $props();

</script>

<button class="frame" class:empty={!url} onclick={() => changeSelected(id, true)}>
    {#if !url}
        <img src={EmptySlot} alt="" class="border" />
    {:else}
        {#if isVideo}
            <video src={url} class="media" muted playsinline preload="metadata"></video>
        {:else}
            <img src={url} alt="" class="media" />
        {/if}
        <img src={isVideo ? VideoFrameLarge : PhotoFrameLarge} alt="" class="border" />
    {/if}
    {#if selected}
        <img src={SelectedImage} alt="" class="selected" />
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

        .media {
            position: absolute;
            left: calc(4 / 66 * 100%);
            top: calc(4 / 52 * 100%);
            width: calc(56 / 66 * 100%);
            height: calc(42 / 52 * 100%);
            object-fit: cover;
        }

        .border {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            image-rendering: pixelated;
        }

        .selected {
            position: absolute;
            left: calc(-3 / 66 * 100%);
            top: calc(-3 / 52 * 100%);
            width: calc(72 / 66 * 100%);
            height: calc(58 / 52 * 100%);
            image-rendering: pixelated;
        }
    }
</style>
