export const ZOOM_DURATION = 200;

let zooming = $state(false);

export function isZooming() {
    return zooming;
}

export function animZoom() {
    zooming = true;
    setTimeout(() => {
        zooming = false;
    }, ZOOM_DURATION)
}