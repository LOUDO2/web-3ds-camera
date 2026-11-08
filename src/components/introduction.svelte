<script lang="ts">
    import { fade } from "svelte/transition";

    import BirdIdle from "#lib/assets/images/bird/wait/1.png"
    import BirdFly1 from "#lib/assets/images/bird/fly/1.png"
    import BirdFly2 from "#lib/assets/images/bird/fly/2.png"
    import BirdFly3 from "#lib/assets/images/bird/fly/3.png"

    import BirdHasSomethingToSay from "#lib/assets/images/bird/bird_has_something_to_say.png"

    const WAIT_FRAME = 75;

    const FLY_FRAMES = [BirdFly1, BirdFly2, BirdFly3, BirdFly2]

    let visible = $state(true)
    let isIdle = $state(false)
    let frame = $state(BirdFly1)

    function flyToCenter() {
        let i = 0
        return setInterval(() => {
            i = (i + 1) % FLY_FRAMES.length
            frame = FLY_FRAMES[i]
        }, WAIT_FRAME)
    }

    $effect(() => {
        if (!visible) return
        if (isIdle) {
            frame = BirdIdle
            return
        }
        const id = flyToCenter()
        return () => clearInterval(id)
    })

    function arrived(event: AnimationEvent) {
        if (event.target === event.currentTarget) isIdle = true
    }

    function dismiss() {
        if (!isIdle) return
        visible = false
    }

</script>

{#if visible}
    <div class="introduction" out:fade={{ duration: 500 }}>
        <button class="bird" disabled={!isIdle} onclick={dismiss} onanimationend={arrived}>
            {#if isIdle}
                <img class="bubble" src={BirdHasSomethingToSay} alt="" />
            {/if}
            <img src={frame} alt="Bird" />
        </button>
    </div>
{/if}

<style lang="scss">

    .introduction {
        z-index: 5;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        overflow: hidden;
    }

    .bird {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 20%;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
        animation: fly-in 2.5s ease-out;

        &:disabled {
            cursor: default;
        }

        img {
            display: block;
            width: 100%;
        }

        .bubble {
            position: absolute;
            bottom: 80%;
            left: 25%;
            width: 50%;
            animation: bubble-pop 0.3s ease-out;
        }
    }

    @keyframes fly-in {
        from {
            left: 130%;
            top: 35%;
        }
        to {
            left: 50%;
            top: 50%;
        }
    }

    @keyframes bubble-pop {
        from {
            translate: 0 100%;
            opacity: 0;
        }
        to {
            translate: 0 0;
            opacity: 1;
        }
    }

</style>
