const VERSION = '0.34.1';
const CACHE_PREFIX = 'fliperama-ds-';
const SHELL_CACHE = `${CACHE_PREFIX}shell-v${VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime-v${VERSION}`;

const SHELL = [
  './',
  './index.html',
  './app.js',
  './app.css',
  './phaser.js',
  './manifest.webmanifest',
  './version.json',
  './icons/fliperama-ds.svg',
  './icons/arcade-ds.svg',
  './diagnostico.html',
  './diagnostico-jogos.html',
  './validation/game-audit-results.json',
  './validation/three-d-test-results.json',
  './games/voxelcraft-ds/index.html',
  './games/voxelcraft-ds/css/style.css',
  './games/voxelcraft-ds/js/app.js',
  './games/voxelcraft-ds/js/game.js',
  './games/voxelcraft-ds/js/storage.js',
  './games/voxelcraft-ds/vendor/three/three.module.min.js',
  './museum/data/catalog.json',
  './museum/viewer/museum-viewer.js',
  './education/game-learning.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.allSettled(SHELL.map(async (path) => {
      const request = new Request(path, { cache: 'reload' });
      const response = await fetch(request);
      if (!response.ok) throw new Error(`Falha ao pré-carregar ${path}: HTTP ${response.status}`);
      await cache.put(request, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith(CACHE_PREFIX) && ![SHELL_CACHE, RUNTIME_CACHE].includes(key))
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function networkFirst(request, fallbackPath) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (fallbackPath) {
      const fallback = await caches.match(fallbackPath, { ignoreSearch: true });
      if (fallback) return fallback;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });
  const network = fetch(request).then((response) => {
    if (response.ok && new URL(request.url).origin === self.location.origin) {
      void cache.put(request, response.clone());
    }
    return response;
  }).catch(() => undefined);
  return cached || await network || Response.error();
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('range')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, './index.html'));
    return;
  }

  if (url.pathname.endsWith('/version.json') || url.pathname.endsWith('/app.js') || url.pathname.endsWith('/app.css') || url.pathname.endsWith('/phaser.js')) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
