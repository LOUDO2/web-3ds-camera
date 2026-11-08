let zooming = $state(false);

export function isZooming() {
    return zooming;
}

export function animZoom() {
    zooming = true;
    setTimeout(() => {
        zooming = false;
    }, 200)
}