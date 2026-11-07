<script lang="ts">

    import Cat from "#lib/assets/images/placeholders/cat.png"
    import Cat2 from "#lib/assets/images/placeholders/cat_2.png"
    import Cat3 from "#lib/assets/images/placeholders/cat_3.png"
    import Media from "./media.svelte";
    import MediaModal from "./media-modal.svelte";

    let selectedId = $state(-1);
    let modalOpen = $state(false);

    let maxSlot = $state(6);

    function changeSelected(id: number, openModal: boolean) {

        selectedId = id;
        if (openModal) {
            modalOpen = medias[id] !== undefined;
        }
    }

    let medias: string[] = [
        Cat,
        Cat2,
        Cat3
    ]

    let slots = $derived(Array.from({ length: Math.max(maxSlot, medias.length) }, (_, i) => medias[i]));

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
        <div class="photos">
            {#each slots as media, index}
                <Media id={index} url={media} selected={index === selectedId} changeSelected={changeSelected} />
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
            width: calc(100% - 5em);
            aspect-ratio: 256 / 160;
            background: url("../lib/assets/images/ui/photo-panel.png") center / 100% 100% no-repeat;
            image-rendering: pixelated;
            position: relative;
            container-type: inline-size;
        }

        .photos {
            --px: calc(100cqw / 256);
            position: absolute;
            left: calc(19 * var(--px));
            top: calc(21 * var(--px));
            display: grid;
            grid-template-columns: repeat(3, calc(66 * var(--px)));
            grid-auto-rows: calc(52 * var(--px));
            column-gap: calc(10 * var(--px));
            row-gap: calc(14 * var(--px));
        }
    }

</style>
