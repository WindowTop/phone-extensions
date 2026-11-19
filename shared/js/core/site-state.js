// Site-wide flags from the address.
//   dev          ?dev shows development extensions. Remembered for the tab (sessionStorage) and kept on every internal link.
//   fromWindowTop ?from=windowtop (the WindowTop QR code) shows a tip. Kept only on extension links, dropped on the list.
// WindowTop emits these parameters, their names are a contract (skill develop-phone-extensions-subdomain).

import { LIST_PATH } from './router.js';

const DEV_KEY = 'phoneExtensionsDev';

export function readFlags(search, storage) {
  const params = new URLSearchParams(search || '');
  let dev = params.has('dev');
  const from = params.get('from') === 'windowtop';
  try {
    if (storage) {
      if (dev) storage.setItem(DEV_KEY, '1');
      else if (storage.getItem(DEV_KEY) === '1') dev = true;
    }
  } catch (e) { /* storage blocked: the URL flag still works */ }
  return { dev, from };
}

export function createSiteState(search, storage) {
  const flags = readFlags(search, storage);
  return {
    isDev: () => flags.dev,
    fromWindowTop: () => flags.from,
    // Called on every navigation: going to the list drops the WindowTop tip.
    enterRoute(route) {
      if (route && route.name === 'list') flags.from = false;
    },
    // Internal link with the flags that must survive navigation.
    url(path) {
      const query = [];
      if (flags.dev) query.push('dev');
      if (flags.from && path !== LIST_PATH) query.push('from=windowtop');
      return path + (query.length ? '?' + query.join('&') : '');
    },
  };
}

function safeStorage() {
  try { return typeof sessionStorage !== 'undefined' ? sessionStorage : null; } catch (e) { return null; }
}

export const siteState = createSiteState(typeof location !== 'undefined' ? location.search : '', safeStorage());
