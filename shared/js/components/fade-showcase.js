import { h } from '../core/dom.js';

// The one cross-fade used by every screenshot group: one image box, no controls.
// Each slide is shown FADE_INTERVAL_MS, the fade itself is --fade-ms in css/tokens.css (0.8 s).
// Pauses while the pointer is over the box. With "reduce motion" the first slide stays.
export const FADE_INTERVAL_MS = 2000;

export function FadeShowcase(slides) {
  const nodes = slides.map((slide, i) => h('figure', { class: i === 0 ? 'sl on' : 'sl' }, slide));
  const box = h('div', { class: 'fade' }, nodes);
  if (nodes.length < 2) return box;
  if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return box;

  let index = 0;
  let paused = false;
  box.addEventListener('pointerenter', () => { paused = true; });
  box.addEventListener('pointerleave', () => { paused = false; });
  const timer = setInterval(() => {
    if (!box.isConnected) {
      // The page was replaced by another one: stop this timer.
      clearInterval(timer);
      return;
    }
    if (paused) return;
    nodes[index].classList.remove('on');
    index = (index + 1) % nodes.length;
    nodes[index].classList.add('on');
  }, FADE_INTERVAL_MS);
  return box;
}