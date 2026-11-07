<script lang="ts">
    import Border from "#lib/assets/images/slider/border.png"
    import BorderEdge from "#lib/assets/images/slider/border-edge.png"
    import ArrowLeft from "#lib/assets/images/slider/arrow-left.png"
    import ArrowRight from "#lib/assets/images/slider/arrow-right.png"
    import ZoomIn from "#lib/assets/images/zoom/zoom-in.png"
    import ZoomOut from "#lib/assets/images/zoom/zoom-out.png"
</script>

<div class="slider">
    <div class="background">
        <div class="border fill theme-bg" style:mask-image="url({Border})"></div>
        <img src={BorderEdge} class="border border-edge" alt="">

        <div class="line">
            <img src={ZoomIn} class="zoom zoom-in" alt="Zoom In" />
            <div class="track">
                <img src={ArrowLeft} alt="Arrow Left" class="track-left" />
                <img src={ArrowRight} alt="Arrow Right" class="track-right" />
            </div>
            <img src={ZoomOut} class="zoom zoom-out" alt="Zoom Out" />
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
                }

                .zoom {
                    display: block;
                    width: calc(32 * var(--px));
                    height: auto;
                    flex: none;
                    margin-bottom: calc(8 * var(--px));
                    image-rendering: pixelated;
                    opacity: 0.85;
                    
                    &:active {
                        transform: translate(7px, 7px);
                        transition: all;
                        transition-duration: 100ms;
                    }
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
