<script lang="ts">

    import Cat from "#lib/assets/images/placeholders/cat.png"
    import Cat2 from "#lib/assets/images/placeholders/cat_2.png"
    import Cat3 from "#lib/assets/images/placeholders/cat_3.png"
    import Media from "./media.svelte";
    import MediaModal from "./media-modal.svelte";
    import { settings } from "#lib/stores/settings.svelte.ts";

    let selectedId = $state(-1);
    let modalOpen = $state(false);

    function changeSelected(id: number, openModal: boolean) {

        selectedId = id;
        if (openModal) {
            modalOpen = medias[id] !== undefined;
        }
    }

    function maxSlot() {
        if (settings.zoomMode == 1) {
            return 6;
        } else if (settings.zoomMode == 2) {
            return 12;
        } else if (settings.zoomMode == 3) {
            return 20;
        } else {
            return 6;
        }
    }

    let medias: string[] = [
        Cat,
        Cat2,
        Cat3
    ]

    let slots = $derived(Array.from({ length: Math.max(maxSlot(), medias.length) }, (_, i) => medias[i]));

    function handleKeydown(event: KeyboardEvent) {
        switch (event.key) {
            case "ArrowRight":
                changeSelected(Math.min(selectedId + 1, slots.length - 1), false);
                break;
            case "ArrowLeft":
                changeSelected(Math.max(selectedId - 1, 0), false);
                break;
            case "Enter":
                changeSelected(selectedId, true);
                break;
            case "Escape":
                modalOpen = false;
                break;
        }
    }

</script>

<svelte:window onkeydown={handleKeydown} />

<div class="photo-panel">
    <div class="bg">
        <div class="photos zoom-{settings.zoomMode}">
            {#each slots as media, index}
                <Media id={index} url={media} selected={index === selectedId} changeSelected={changeSelected} zoomMode={settings.zoomMode} />
            {/each}
        </div>
    </div>
</div>

{#if modalOpen && selectedId !== -1}
    <MediaModal url={medias[selectedId]} index={selectedId} count={medias.length} changeSelected={changeSelected} onclose={() => modalOpen = false} />
{/if}

<style lang="scss">

    .photo-panel {
        display: flex;
        justify-content: center;
        align-items: center;

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
