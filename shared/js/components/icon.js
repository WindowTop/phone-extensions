import { h } from '../core/dom.js';

// Extension icon. size: 's' (list), 'm' (page header on a phone), 'l' (page header). Falls back to the first letter of the name.
export function Icon(ext, size = 's') {
  const letter = () => h('div', { class: 'icon letter ' + size, 'aria-hidden': 'true' }, (ext.name || '?').charAt(0).toUpperCase());
  if (!ext.images || !ext.images.icon) return letter();
  const img = h('img', { class: 'icon ' + size, src: ext.images.icon, alt: '', width: '84', height: '84' });
  img.addEventListener('error', () => img.replaceWith(letter()));
  return img;
}