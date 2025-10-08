// Simple falling stars / glitter animation
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const stars = [];
const STAR_COUNT = 80;

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.5,
    d: Math.random() * 0.5 + 0.2,
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = stars[i];
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  update();
}

let angle = 0;
function update() {
  angle += 0.01;
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = stars[i];
    s.y += Math.cos(angle + s.d) + s.d;
    s.x += Math.sin(angle) * 0.3;

    if (s.y > h) {
      s.y = 0;
      s.x = Math.random() * w;
    }
  }
}

function animate() {
  draw();
  requestAnimationFrame(animate);
}
animate();