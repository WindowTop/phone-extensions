import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { Section } from './section.js';
import { FadeShowcase } from './fade-showcase.js';
import { PhoneFrame } from './phone-frame.js';

function shotKey(url) {
  const name = url.split('/').pop().replace(/\.[a-z0-9]+$/i, '');
  return name.replace(/-\d+$/, '');
}

function pcSlide(url) {
  const label = TEXTS.shotLabels[shotKey(url)];
  return [h('img', { src: url, alt: label || '', loading: 'lazy' }), label ? h('figcaption', null, label) : null];
}

function phoneSlide(url) {
  return h('img', { src: url, alt: '', loading: 'lazy' });
}

// Two groups, one cross-fade each. A group without images is hidden; no images at all hides the section.
export function ScreenshotsSection(ext) {
  const pc = ext.images.pc;
  const phone = ext.images.phone;
  if (!pc.length && !phone.length) return null;
  return Section(
    { title: TEXTS.screenshots, className: 'shots' },
    h(
      'div',
      { class: 'shots-grid' },
      pc.length ? h('div', null, h('h4', null, TEXTS.onWindowTop), FadeShowcase(pc.map(pcSlide))) : null,
      phone.length ? h('div', null, h('h4', null, TEXTS.onPhone), PhoneFrame(FadeShowcase(phone.map(phoneSlide)))) : null,
    ),
  );
}