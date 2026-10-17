/**
 * Main JS file for theme behaviours
 */
const body = document.body;
const menuToggle = document.getElementById("menu-toggle");
const toTop = document.getElementById("back-to-top");
const canvas = document.createElement("canvas");
let toTopShown = false;

// Menu on small screens
menuToggle.addEventListener("click", event => {
  body.classList.toggle("menu--opened");
  menuToggle.blur();
  event.preventDefault();
});

// Back to top button
toTop.addEventListener("click", event => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  event.preventDefault();
});

addEventListener("resize", update);
addEventListener("orientationchange", update);
addEventListener("scroll", update, { passive: true });
update();

function update() {
  if (getComputedStyle(menuToggle).display !== "none") return drawProgress();
  body.classList.remove("menu--opened");
  toTopShown = false;
  toTop.style.display = "none";
  canvas.remove();
}

function drawProgress() {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  const progress = Math.ceil((scrollY / scrollable) * 10000) / 10000;
  if (progress < 0.1) return showToTop(false);
  showToTop(true);
  const size = parseFloat(getComputedStyle(toTop).height);
  const radius = (size - 2) / 2;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = size;
  ctx.translate(size / 2, size / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  stroke("#eee", Math.PI * 2);
  stroke("#d4a259", Math.PI * 2 * progress);
  if (!canvas.isConnected) toTop.append(canvas);

  function stroke(color, angle) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, angle);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

function showToTop(show) {
  if (show === toTopShown) return;
  toTopShown = show;
  if (show) {
    toTop.style.display = "block";
    toTop.animate([{ opacity: 0 }, { opacity: 1 }], 600);
  } else {
    toTop.animate([{ opacity: 1 }, { opacity: 0 }], 300).onfinish = () => {
      if (!toTopShown) toTop.style.display = "none";
    };
  }
}
