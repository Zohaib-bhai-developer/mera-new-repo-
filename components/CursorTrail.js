import { useEffect, useRef } from "react";

/**
 * CursorTrail
 * - shows a small trail of dots following the cursor
 * - shows your name label near the pointer
 *
 * Edit `USER_NAME` to change the displayed name.
 */
export default function CursorTrail() {
  const containerRef = useRef(null);
  const dots = [];
  const DOTS_COUNT = 10;         // number of dots in trail
  const TRAIL_SPACING = 6;       // spacing smoothing

  const USER_NAME = "Zohaib";    // <-- change to your name if you want

  useEffect(() => {
    const container = document.createElement("div");
    container.className = "cursor-trail";
    document.body.appendChild(container);
    containerRef.current = container;

    // create dots
    for (let i = 0; i < DOTS_COUNT; i++) {
      const d = document.createElement("div");
      d.className = "trail-dot";
      d.style.opacity = String(1 - i / (DOTS_COUNT + 2));
      container.appendChild(d);
      dots.push({ el: d, x: 0, y: 0, vx: 0, vy: 0 });
    }

    // name label
    const nameLabel = document.createElement("div");
    nameLabel.className = "cursor-name glass-card";
    nameLabel.textContent = USER_NAME;
    container.appendChild(nameLabel);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let running = true;

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // position label immediately near top of cursor
      nameLabel.style.left = `${mouseX}px`;
      nameLabel.style.top = `${mouseY}px`;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        nameLabel.style.left = `${mouseX}px`;
        nameLabel.style.top = `${mouseY}px`;
      }
    }, { passive: true });

    // simple spring smoothing animation
    function animate() {
      for (let i = 0; i < dots.length; i++) {
        const point = dots[i];
        const targetX = i === 0 ? mouseX : dots[i - 1].x;
        const targetY = i === 0 ? mouseY : dots[i - 1].y;

        // ease toward target
        point.vx += (targetX - point.x) / (TRAIL_SPACING + i * 0.6);
        point.vy += (targetY - point.y) / (TRAIL_SPACING + i * 0.6);

        // damping
        point.vx *= 0.7;
        point.vy *= 0.7;

        point.x += point.vx;
        point.y += point.vy;

        // set transform
        point.el.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%) scale(${1 - i * 0.04})`;
        point.el.style.opacity = String(Math.max(0.08, 1 - i * 0.09));
      }
      if (running) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // cleanup
    return () => {
      running = false;
      window.removeEventListener("mousemove", onMove);
      if (container && container.parentElement) container.parentElement.removeChild(container);
    };
  }, []);

  return null;
}
