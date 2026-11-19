import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { Icon } from './icon.js';
import { Pill, DevTag, PlatformBadge } from './pill.js';

export function ExtensionHeader(ext) {
  return h(
    'div',
    { class: 'ext-header' },
    Icon(ext, 'l'),
    h(
      'div',
      null,
      h('h1', null, ext.name, ext.dev ? DevTag() : null),
      h(
        'div',
        { class: 'pills' },
        Pill(ext.category),
        Pill('v' + ext.version),
        ext.size ? Pill(ext.size) : null,
        Pill(TEXTS.androidRequires(ext.minAndroid || '8.0')),
        PlatformBadge(),
      ),
    ),
  );
}