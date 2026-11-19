// Client-side router: history.pushState, link interception, popstate, scroll restore.
// URL contract (other products depend on it, see skill develop-phone-extensions-subdomain):
//   /                      list of extensions
//   /<id>/android/         extension page (a real folder on GitHub Pages)
//   /<id>/                 replaced by /<id>/android/

export const LIST_PATH = '/';
export const PLATFORM = 'android';

export function extensionPath(id) {
  return '/' + id + '/' + PLATFORM + '/';
}

// Pure: pathname -> route. Routes: list, extension, redirect, notFound.
export function parse(pathname) {
  let p = String(pathname || '/').split('?')[0].split('#')[0];
  p = p.replace(/\/index\.html$/i, '/');
  const segments = p.split('/').filter(Boolean);

  if (segments.length === 0) return { name: 'list' };
  if (segments[0] === 'shared') return { name: 'notFound', id: 'shared' };
  if (segments.length === 1) return { name: 'redirect', to: extensionPath(segments[0]), id: segments[0] };
  if (segments.length === 2 && segments[1] === PLATFORM) return { name: 'extension', id: segments[0], platform: PLATFORM };
  return { name: 'notFound', id: segments[0] };
}

// Pure: is this href an internal link the router should handle?
export function isInternalLink(href, origin) {
  if (!href) return false;
  try {
    const url = new URL(href, origin);
    return url.origin === origin;
  } catch (e) {
    return false;
  }
}

export function start(render) {
  function run(isPop) {
    const route = parse(location.pathname);
    if (route.name === 'redirect') {
      history.replaceState(history.state, '', route.to + location.search + location.hash);
      run(isPop);
      return;
    }
    render(route);
    window.scrollTo(0, isPop ? ((history.state && history.state.scroll) || 0) : 0);
  }

  function navigate(url) {
    history.replaceState(Object.assign({}, history.state, { scroll: window.scrollY }), '');
    history.pushState({}, '', url);
    run(false);
  }

  window.addEventListener('popstate', () => run(true));

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
    if (!isInternalLink(anchor.getAttribute('href'), location.origin)) return;
    event.preventDefault();
    const url = new URL(anchor.getAttribute('href'), location.origin);
    navigate(url.pathname + url.search + url.hash);
  });

  run(false);
  return { navigate };
}
