<script lang="ts">
    import Border from "#lib/assets/images/slider/border.png"
    import BorderEdge from "#lib/assets/images/slider/border-edge.png"
    import ArrowLeft from "#lib/assets/images/slider/arrow-left.png"
    import ArrowRight from "#lib/assets/images/slider/arrow-right.png"
    import ZoomIn from "#lib/assets/images/zoom/zoom-in.png"
    import ZoomOut from "#lib/assets/images/zoom/zoom-out.png"
    import Marker from "#lib/assets/images/slider/marker.png"
    import Thumb from "#lib/assets/images/slider/thumb.png"
    import ThumbSlot from "#lib/assets/images/slider/thumb-slot.png"
    import { settings } from "#lib/stores/settings.svelte.ts";
    import { animZoom, isZooming } from "#lib/stores/zoomingAnim.svelte.ts";
    import { album, dragBy, maxScroll, rate, release, selectedRate, setZoom, step } from "#lib/stores/album.svelte.ts";
    import { velocityTracker } from "#lib/drag.ts";
    import Bird from "./bird.svelte";
    import { SOUNDS, playSound } from "#lib/sounds.ts";

    function changeZoom(mode: string) {
        if (isZooming()) return;
        if (settings.zoomMode == 1 && mode === "plus" || settings.zoomMode == 3 && mode === "minus") return;
        animZoom()
        playSound(mode === "plus" ? SOUNDS.photo.zoomIn : SOUNDS.photo.zoomOut)
        playSound(SOUNDS.button.press)
        if (mode === "plus") {
            setZoom(Math.max(settings.zoomMode - 1, 1))
        } else if (mode === "minus") {
            setZoom(Math.min(settings.zoomMode + 1, 3))
        }
    }

    let rail: HTMLDivElement;
    let cursor: HTMLDivElement;
    let dragging = $state(false);
    const tracker = velocityTracker();
    let lastPage = Math.round(album.scroll);

    $effect(() => {
        const page = Math.round(album.scroll);
        if (page === lastPage) return;
        lastPage = page;
        playSound(SOUNDS.slider.tick);
    });

    function pagesPerPixel() {
        return maxScroll() / rail.clientWidth;
    }

    function onpointerdown(event: PointerEvent) {
        if (!cursor.contains(event.target as Node)) {
            const box = cursor.getBoundingClientRect();
            step(event.clientX < box.left + box.width / 2 ? -1 : 1);
            return;
        }
        dragging = true;
        playSound(SOUNDS.button.press);
        rail.setPointerCapture(event.pointerId);
        tracker.start(event.clientX);
    }

    function onpointermove(event: PointerEvent) {
        if (!dragging) return;
        dragBy(tracker.move(event.clientX) * pagesPerPixel());
    }

    function onpointerup() {
        if (!dragging) return;
        dragging = false;
        release(tracker.end() * pagesPerPixel());
    }
</script>

<div class="slider">
    <Bird />
    <div class="background">
        <div class="border fill" style:background-color={settings.themeColor} style:mask-image="url({Border})"></div>
        <img src={BorderEdge} class="border border-edge" alt="">

        <div class="line">
            <button onclick={() => changeZoom('plus')}>
                <img src={ZoomIn} class="zoom zoom-in {(settings.zoomMode > 1 && !isZooming()) && 'click'} {settings.zoomMode === 1 && 'disabled'}" alt="Zoom In" />
            </button>
            <div class="track">
                <button onclick={() => step(-1)}>
                    <img src={ArrowLeft} alt="Arrow Left" class="track-left" />
                </button>
                <div
                    class="rail"
                    bind:this={rail}
                    role="presentation"
                    {onpointerdown}
                    {onpointermove}
                    {onpointerup}
                    onpointercancel={onpointerup}
                    ondragstart={(e) => e.preventDefault()}
                >
                    <img src={ThumbSlot} alt="" class="slot" style:left="{rate() * 100}%" />
                    {#if album.selected !== -1}
                        <img src={Marker} alt="" class="marker" style:left="{selectedRate() * 100}%" />
                    {/if}
                    <div class="cursor" class:held={dragging} bind:this={cursor} style:left="{rate() * 100}%">
                        <img src={Thumb} alt="" />
                    </div>
                </div>
                <button onclick={() => step(1)}>
                    <img src={ArrowRight} alt="Arrow Right" class="track-right" />
                </button>
            </div>
            <button onclick={() => changeZoom('minus')}>
                <img src={ZoomOut} class="zoom zoom-out {(settings.zoomMode < 3 && !isZooming()) && 'click'} {settings.zoomMode === 3 && 'disabled'}" alt="Zoom Out" />
            </button>
        </div>
    </div>
</div>

<style lang="scss">

    .slider {
        position: relative;
        width: 100%;
        container-type: inline-size;
        isolation: isolate;
        --px: calc(100cqw / 320);

        .background {
            position: relative;

            .line {
                position: absolute;
                inset: 10% 0 0 0;
                display: flex;
                align-items: center;

                  .disabled {
                    opacity: 0.4 !important;
                }

                .track {
                    z-index: 5;
                    width: 100%;
                    max-width: 75%;
                    margin: 0 auto;
                    background: url("../lib/assets/images/slider/track.png") repeat-x center;
                    display: flex;
                    justify-content: space-between;
                    background-size: var(--px) calc(8 * var(--px));
                    align-items: center;

                    .track-left:active {
                        transform: translateX(-5px) scale(1.02);
                        transition: all;
                        transition-duration: 50ms;
                    }

                     .track-right:active {
                        transform: translateX(5px) scale(1.02);
                        transition: all;
                        transition-duration: 50ms;
                    }

                    img {
                        display: block;
                        width: calc(25 * var(--px));
                        height: auto;
                        flex: none;
                        image-rendering: pixelated;
                    }

                    .rail {
                        position: relative;
                        flex: 1;
                        align-self: stretch;
                        margin-inline: calc(8 * var(--px));
                        touch-action: none;
                        user-select: none;

                        .slot, .marker, .cursor {
                            position: absolute;
                            top: 50%;
                            translate: -50% -50%;
                        }

                        .slot, .marker {
                            pointer-events: none;
                        }

                        .slot {
                            width: calc(8 * var(--px));
                        }

                        .marker {
                            width: calc(10 * var(--px));
                        }

                        .cursor {
                            margin-top: calc(1 * var(--px));
                            transition: scale 50ms;

                            img {
                                width: calc(18 * var(--px));
                            }

                            &.held {
                                scale: 1 1.2;
                            }
                        }
                    }
                }

                .zoom {
                    display: block;
                    width: calc(32 * var(--px));
                    height: auto;
                    flex: none;
                    margin-bottom: calc(8 * var(--px));
                    image-rendering: pixelated;
                    opacity: 0.85;
                }

                .click:active {
                    transform: translate(7px, 7px);
                    transition: all;
                    transition-duration: 100ms;
                }

                .zoom-in {
                    margin-left: calc(2 * var(--px));
                }

                .zoom-out {
                    margin-right: calc(2 * var(--px));
                }
            }
        }

        .border {
            display: block;
            width: 100%;
            height: auto;
            image-rendering: pixelated;
            position: relative;
            z-index: 1;
            pointer-events: none;
        }

        .fill {
            aspect-ratio: 320 / 27;
            mask-size: 100% 100%;
            mask-repeat: no-repeat;
            z-index: 1;
        }

        .border-edge {
            position: absolute;
            top: 0;
            left: 0;
        }
    }


</style>
