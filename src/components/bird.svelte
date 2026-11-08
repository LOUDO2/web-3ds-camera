<script lang="ts">
    import Bird from "#lib/assets/images/bird/wait/1.png"
    import BirdLookRight1 from "#lib/assets/images/bird/wait/a/1.png"
    import BirdLookRight2 from "#lib/assets/images/bird/wait/a/2.png"

    import BirdLookLeft1 from "#lib/assets/images/bird/wait/c/1.png"
    import BirdLookLeft2 from "#lib/assets/images/bird/wait/c/2.png"

    import BirdLookFoward1 from "#lib/assets/images/bird/wait/b/1.png"
    import BirdLookFoward2 from "#lib/assets/images/bird/wait/b/2.png"

    import BirdBlinking1 from "#lib/assets/images/bird/wait/f/1.png"
    import BirdBlinking2 from "#lib/assets/images/bird/wait/f/2.png"

    import BirdScratch1 from "#lib/assets/images/bird/wait/d/1.png"
    import BirdScratch2 from "#lib/assets/images/bird/wait/d/2.png"
    import BirdScratch3 from "#lib/assets/images/bird/wait/d/3.png"


    const WAIT_FRAME = 150;

    const FRAMES = [
        Bird,
        BirdLookRight1, BirdLookRight2,
        BirdLookLeft1, BirdLookLeft2,
        BirdLookFoward1, BirdLookFoward2,
        BirdBlinking1, BirdBlinking2,
        BirdScratch1, BirdScratch2, BirdScratch3,
    ]

    function preload() {
        for (const src of FRAMES) {
            const img = new Image()
            img.src = src
        }
    }

    let frame = $state(Bird)

    function lookRight() {
        frame = BirdLookRight1
        setTimeout(() => frame = BirdLookRight2, WAIT_FRAME)
        setTimeout(() => frame = BirdLookRight1, WAIT_FRAME * 10)
        setTimeout(() => idle(), WAIT_FRAME * 11)
    }

    function lookLeft() {
        frame = BirdLookLeft1
        setTimeout(() => frame = BirdLookLeft2, WAIT_FRAME)
        setTimeout(() => frame = BirdLookLeft1, WAIT_FRAME * 10)
        setTimeout(() => idle(), WAIT_FRAME * 11)
    }

    function lookFoward() {
        frame = BirdLookFoward1
        setTimeout(() => frame = BirdLookFoward2, WAIT_FRAME)
        setTimeout(() => frame = BirdLookFoward1, WAIT_FRAME * 10)
        setTimeout(() => idle(), WAIT_FRAME * 11)
    }

    function blinking() {
        frame = BirdBlinking1
        setTimeout(() => frame = BirdBlinking2, WAIT_FRAME)
        setTimeout(() => frame = BirdBlinking1, WAIT_FRAME * 2)
        setTimeout(() => idle(), WAIT_FRAME * 3)
    }

    function scroutchscroutchscratch() {
        frame = BirdScratch1
        setTimeout(() => frame = BirdScratch2, WAIT_FRAME)
        setTimeout(() => frame = BirdScratch3, WAIT_FRAME * 1.5)
        setTimeout(() => frame = BirdScratch2, WAIT_FRAME * 2)
        setTimeout(() => frame = BirdScratch3, WAIT_FRAME * 2.5)
        setTimeout(() => frame = BirdScratch2, WAIT_FRAME * 3)
        setTimeout(() => frame = BirdScratch3, WAIT_FRAME * 3.5)
        setTimeout(() => frame = BirdScratch2, WAIT_FRAME * 4)
        setTimeout(() => frame = BirdScratch1, WAIT_FRAME * 4.5)
        setTimeout(() => idle(), WAIT_FRAME * 5)
    }

    function idle() {
        frame = Bird
    }

    function mainLoop() {
        return setInterval(() => {
            let random = Math.random() * 6;
            if (random < 1) {
                lookRight()
            } else if (random < 2) {
                lookLeft()
            } else if (random < 3) {
                lookFoward()
            } else if (random < 4) {
                blinking()
            } else if (random < 5) {
                scroutchscroutchscratch()
            } else {
                idle()
            }
        }, 10000)
    }

    $effect(() => {
        preload()
        const id = mainLoop()
        return () => clearInterval(id)
    })

</script>

<div class="bird">
    <img src={frame} alt="Bird" />
</div>

<style lang="scss">

    .bird {
        position: absolute;
        pointer-events: none;
        z-index: 2;
        bottom: 57%;
        left: 5%;
        width: 100%;

        img {
            width: 20%;
        }
    }

</style>