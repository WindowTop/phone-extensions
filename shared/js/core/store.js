// Extension data. Loads the generated /extensions.json and offers pure query helpers.

import { extensionPath } from './router.js';

function resolveImage(id, path) {
  if (!path) return null;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('/')) return path;
  return extensionPath(id) + path;
}

// Image paths in extension.json are relative to <id>/android/. Pages get absolute URLs.
export function normalize(raw) {
  const images = raw.images || {};
  return Object.assign({}, raw, {
    permissions: raw.permissions || [],
    images: {
      icon: resolveImage(raw.id, images.icon),
      pc: (images.pc || []).map((p) => resolveImage(raw.id, p)),
      phone: (images.phone || []).map((p) => resolveImage(raw.id, p)),
    },
  });
}

export async function loadExtensions(fetchFn) {
  const doFetch = fetchFn || fetch;
  const response = await doFetch('/extensions.json', { cache: 'no-cache' });
  if (!response.ok) throw new Error('extensions.json: HTTP ' + response.status);
  const list = await response.json();
  return list.map(normalize);
}

// Development extensions (dev: true) are listed only in dev mode. This hides them, it is not a security measure.
export function visible(list, dev) {
  return list.filter((e) => dev || !e.dev);
}

export function byId(list, id) {
  return list.find((e) => e.id === id);
}

export function categories(list) {
  return [...new Set(list.map((e) => e.category).filter(Boolean))].sort();
}

export function search(list, query) {
  const q = ((query && query.q) || '').trim().toLowerCase();
  const category = query && query.category;
  return list.filter((e) => {
    const inCategory = !category || e.category === category;
    const text = (e.name + ' ' + (e.description || '') + ' ' + (e.category || '')).toLowerCase();
    return inCategory && text.indexOf(q) !== -1;
  });
}
