// Platform of the visitor. The only place that reads the user agent.

export function detectPlatform(userAgent) {
  return /Android/i.test(userAgent || '') ? 'android' : 'other';
}

export function isAndroid(userAgent) {
  const ua = userAgent !== undefined ? userAgent : (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  return detectPlatform(ua) === 'android';
}
