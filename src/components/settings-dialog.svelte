<script lang="ts">
    import DialogSettings from "#lib/assets/images/ui/dialog.png"
    import CloseButton from "#lib/assets/images/ui/close-button.png"
    import ResetButton from "#lib/assets/images/ui/reset-button.png"
    import ImportButton from "#lib/assets/images/ui/import-images.png"
    import { settings } from "#lib/stores/settings.svelte.ts";
    import { importMedias as storeMedias } from "#lib/stores/album.svelte.ts";

    let closing = $state(false);

    function close() {
        closing = true;
    }

    function resetColor() {
        settings.themeColor = "#faa000"; 
        localStorage.setItem("themeColor", settings.themeColor)
    }

    function onAnimationEnd() {
        if (closing) settings.settingsOpen = false;
    }

    function importMedias() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*,video/*";
        input.multiple = true;
        input.onchange = () => {
            const files = Array.from(input.files ?? []);
            if (files.length === 0) return;
            storeMedias(files);
            close();
        };
        input.click();
    }

</script>

<div class="dialog-settings" class:closing>
    <div class="dialog" onanimationend={onAnimationEnd}>
        <div class="frame">
            <img src={DialogSettings} alt="Dialog settings" />
            <div class="inputs">
                <label class="color-field" style:--swatch={settings.themeColor}>
                    <input class="color" type="color" bind:value={settings.themeColor} onchange={() => localStorage.setItem("themeColor", settings.themeColor)} />
                </label>
                <button class="button reset-button" aria-label="Reset button" onclick={resetColor}>
                    <img src={ResetButton} alt="" />
                </button>
                <button class="button close-button" aria-label="Close button" onclick={close}>
                    <img src={CloseButton} alt="" />
                </button>
                <button class="button import-button" aria-label="Import button" onclick={importMedias}>
                    <img src={ImportButton} alt="" />
                </button>
            </div>
        </div>
    </div>
    <div class="bg"></div>
</div>

<style lang="scss">

    .bg {
        background-color: black;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.4;
        z-index: -1;
        animation: fadein 400ms;
    }

    .dialog-settings {
        z-index: 5;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &.closing {
            .dialog {
                animation: slideout 400ms forwards;
            }

            .bg {
                animation: fadeout 400ms forwards;
            }
        }

        .dialog {
            animation: slidein 400ms;
            padding: calc(100% * 5 / 320) calc(100% * 6 / 320);

            .frame {
                position: relative;

                > img {
                    display: block;
                    width: 100%;
                }
            }

            .inputs {
                .color-field {
                    position: absolute;
                    top: calc(100% * 41.5 / 230);
                    left: calc(100% * 77 / 308);
                    width: calc(100% * 46 / 308);
                    height: calc(100% * 24 / 230);
                    box-sizing: border-box;
                    border: 1px solid #8a8a8a;
                    background: white;
                    cursor: pointer;

                    &::after {
                        content: "";
                        position: absolute;
                        inset: calc(100% * 2 / 24) calc(100% * 2 / 46);
                        background: var(--swatch);
                    }

                    .color {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        border: none;
                        opacity: 0;
                        cursor: pointer;
                    }
                }

                .button {
                    padding: 0;
                    border: none;
                    background: none;
                    cursor: pointer;
                    transition: all;
                    transition-duration: 100ms;

                    &:active {
                        opacity: 0.8;
                        transform: scale(1.01, 0.98) translateY(5px);
                    }

                    img {
                        display: block;
                        width: 100%;
                    }
                }

                .close-button {
                    position: absolute;
                    bottom: 6%;
                    left: 35%;
                    width: 28.6%;
                }

                .reset-button {
                    position: absolute;
                    top: calc(100% * 41.5 / 230);
                    left: calc(100% * 131 / 308);
                    width: calc(100% * 50 / 308);
                }

                .import-button {
                    position: absolute;
                    bottom: 38%;
                    left: 35%;
                    width: 28.6%;
                }
            }
        }

    }

    @keyframes slidein {
        0% {
            transform: translateY(100%);
        }

        60% {
            transform: translateY(-4%);
        }

        85% {
            transform: translateY(0.3%);
        }

        100% {
            transform: translateY(0%);
        }

    }

    @keyframes slideout {
        0% {
            transform: translateY(0%);
        }

        15% {
            transform: translateY(0.3%);
        }

        40% {
            transform: translateY(-4%);
        }

        100% {
            transform: translateY(100%);
        }

    }

    @keyframes fadein {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 0.4;
        }
    }

    @keyframes fadeout {
        0% {
            opacity: 0.4;
        }

        100% {
            opacity: 0;
        }
    }
</style>