import main from "#lib/assets/sounds/main.mp3"
import bird1 from "#lib/assets/sounds/bird/1.mp3"
import bird2 from "#lib/assets/sounds/bird/2.mp3"
import bird3 from "#lib/assets/sounds/bird/3.mp3"
import bird4 from "#lib/assets/sounds/bird/4.mp3"
import bird5 from "#lib/assets/sounds/bird/5.mp3"
import bird6 from "#lib/assets/sounds/bird/6.mp3"
import bird7 from "#lib/assets/sounds/bird/7.mp3"
import bird8 from "#lib/assets/sounds/bird/8.mp3"
import folderOpen from "#lib/assets/sounds/folder/open.mp3"
import folderClose from "#lib/assets/sounds/folder/close.mp3"
import buttonPress from "#lib/assets/sounds/button/press.mp3"
import buttonTouch from "#lib/assets/sounds/button/touch.mp3"
import buttonCancel from "#lib/assets/sounds/button/cancel.mp3"
import dialogOpen from "#lib/assets/sounds/dialog/open.mp3"
import dialogClose from "#lib/assets/sounds/dialog/close.mp3"
import dialogOpen2 from "#lib/assets/sounds/dialog/open2.mp3"
import dialogClose2 from "#lib/assets/sounds/dialog/close2.mp3"
import photoZoomIn from "#lib/assets/sounds/photo/zoom-in.mp3"
import photoZoomOut from "#lib/assets/sounds/photo/zoom-out.mp3"
import sliderTick from "#lib/assets/sounds/slider/tick.mp3"

export interface Sound {
    src: string
    volume: number
    loop?: boolean
}

export const SOUNDS = {
    main: {main: {src: main, volume: 0.05, loop: true}},
    bird: {
        1: { src: bird1, volume: 0.55 },
        2: { src: bird2, volume: 0.55 },
        3: { src: bird3, volume: 0.55 },
        4: { src: bird4, volume: 0.55 },
        5: { src: bird5, volume: 0.55 },
        6: { src: bird6, volume: 0.55 },
        7: { src: bird7, volume: 0.55 },
        8: { src: bird8, volume: 0.55 },
    },
    folder: {
        open: { src: folderOpen, volume: 0.39 },
        close: { src: folderClose, volume: 0.39 },
    },
    button: {
        press: { src: buttonPress, volume: 0.24 },
        touch: { src: buttonTouch, volume: 0.47 },
        cancel: { src: buttonCancel, volume: 0.55 },
    },
    dialog: {
        open: { src: dialogOpen, volume: 0.47 },
        close: { src: dialogClose, volume: 0.51 },
        open2: { src: dialogOpen2, volume: 0.47 },
        close2: { src: dialogClose2, volume: 0.47 },
    },
    photo: {
        zoomIn: { src: photoZoomIn, volume: 0.31 },
        zoomOut: { src: photoZoomOut, volume: 0.31 },
    },
    slider: {
        tick: { src: sliderTick, volume: 0.31 },
    },
} satisfies Record<string, Record<string, Sound>>

export function playSound(sound: Sound) {
    const audio = new Audio(sound.src)
    audio.volume = sound.volume
    audio.loop = sound.loop ?? false
    audio.play().catch(() => {})
    return audio
}

let music: HTMLAudioElement | null = null

export function playMusic() {
    music?.pause()
    music = playSound(SOUNDS.main.main)
}

export function pauseMusic() {
    music?.pause()
}

export function resumeMusic() {
    music?.play().catch(() => {})
}
