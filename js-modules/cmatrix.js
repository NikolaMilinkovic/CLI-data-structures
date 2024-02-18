const canvas = document.getElementById('cmatrix');
const screenWidth = canvas.width = window.innerWidth;
const screenHeight = canvas.height = window.innerHeight;
let positions = Array(140).join(1).split('');
const context = canvas.getContext('2d');
const math = Math;
let animationFrameId = null;
// 1 for active 0 for inactive
let animationTracker = 1;

export default function draw() {
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--cmatrix-background');
    context.fillRect(0, 0, screenWidth, screenHeight);
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--cmatrix-color');
    context.font = '12px monospace';
    positions = positions.map((position, index) => {
        const randomValue = math.random();
        const char = String.fromCharCode(math.floor(2720 + randomValue * 33));
        context.fillText(char, index * 15, position);
        position += 10;
        const newPosition = position > 768 + randomValue * 1e4 ? 0 : position;
        return newPosition;
    });

    animationFrameId = requestAnimationFrame(draw);
}
animationFrameId = requestAnimationFrame(draw);

export function stopAnimation() {
    cancelAnimationFrame(animationFrameId);
    animationTracker--;
}

export function startAnimation() {
    if (animationTracker === 1) return;
    animationTracker++;
    draw();
}
