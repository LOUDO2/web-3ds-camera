export function velocityTracker() {
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;

    return {
        start(x: number) {
            velocity = 0;
            lastX = x;
            lastTime = performance.now();
        },
        move(x: number) {
            const now = performance.now();
            const delta = x - lastX;
            velocity = 0.8 * (delta / Math.max(now - lastTime, 1)) + 0.2 * velocity;
            lastX = x;
            lastTime = now;
            return delta;
        },
        end() {
            return performance.now() - lastTime > 100 ? 0 : velocity;
        }
    };
}
