<script lang="ts">

    import PhotoFrameLarge from "#lib/assets/images/media/photo-frame-large.png"
    import VideoFrameLarge from "#lib/assets/images/media/video-strip-large.png"
    import ArrowLeft from "./arrow-left.svelte";
    import ArrowRight from "./arrow-right.svelte";

    let { url, isVideo = false, index, count, changeSelected, onclose }: { url: string, isVideo?: boolean, index: number, count: number, changeSelected: (id: number, openModal: boolean) => void, onclose: () => void } = $props();

</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" onclick={onclose}>
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="frame" onclick={(e) => e.stopPropagation()}>
        {#if isVideo}
            <video src={url} class="media" controls playsinline></video>
        {:else}
            <img src={url} alt="" class="media" />
        {/if}
        <img src={isVideo ? VideoFrameLarge : PhotoFrameLarge} alt="" class="border" />
        {#if index > 0}
            <button class="arrow left" aria-label="Précédent" onclick={() => changeSelected(index - 1, true)}>
                <ArrowLeft />
            </button>
        {/if}
        {#if index < count - 1}
            <button class="arrow right" aria-label="Suivant" onclick={() => changeSelected(index + 1, true)}>
                <ArrowRight />
            </button>
        {/if}
    </div>
</div>

<style lang="scss">

    @keyframes popupImage {
        from {
            background: rgba(0, 0, 0, 0);
        }
        to {
            background: rgba(0, 0, 0, 0.4);
        }
    }


    @keyframes imageFade {
        from {
            transform: scale(0.98);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }


    .backdrop {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
        animation-name: popupImage;
        animation-duration: 200ms;
        animation-timing-function: ease-out;
    }

    .frame {
        position: relative;
        width: min(80vw, calc(80vh * 66 / 52));
        aspect-ratio: 66 / 52;
        animation-name: popup;
        animation-duration: 200ms;
        animation-timing-function: ease-out;

        .media {
            position: absolute;
            left: calc(4 / 66 * 100%);
            top: calc(4 / 52 * 100%);
            width: calc(56 / 66 * 100%);
            height: calc(42 / 52 * 100%);
            object-fit: cover;
            animation-name: imageFade;
            animation-duration: 200ms;
            animation-timing-function: ease-out;
        }

        .border {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            image-rendering: pixelated;
            pointer-events: none;
            animation-name: imageFade;
            animation-duration: 200ms;
            animation-timing-function: ease-out;
        }

        .arrow {
            position: absolute;
            top: 50%;
            border: rgba(220, 219, 219, 0.5) 2px solid;
            border-radius: 10px;
            display: flex;
            padding: 0 0.5em;
            padding-bottom: 2em;
            padding-top: 0.5em;
            color: rgb(206, 205, 205);
            transform: translateY(-50%);

            &.left {
                right: 100%;
            }

            &.right {
                left: 100%;
            }

            width: 2.5em;
            height: 2.5em;
            filter: drop-shadow(0 0 2px black);
        }
    }
</style>
