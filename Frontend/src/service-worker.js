import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

// Pre-cache Webpack assets (ensure that __WB_MANIFEST is correctly populated)
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache JS files in a separate cache
registerRoute(
    ({ request }) => request.destination === 'script', // Match only JS files
    new StaleWhileRevalidate({
        cacheName: 'js-cache', // Separate cache for JS files
    })
);

// Cache CSS files in a separate cache
registerRoute(
    ({ request }) => request.destination === 'style', // Match only CSS files
    new StaleWhileRevalidate({
        cacheName: 'css-cache', // Separate cache for CSS files
    })
);

// Cache HTML files in a separate cache
registerRoute(
    ({ request }) => request.destination === 'document', // Match only HTML files
    new StaleWhileRevalidate({
        cacheName: 'html-cache', // Separate cache for HTML files
    })
);

// Cache images & fonts using CacheFirst
registerRoute(
    ({ request }) => request.destination === 'image' || request.destination === 'font',
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,// Limit number of images/fonts in cache
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
            }),
        ],
    })
);

// Cache Maps API responses with StaleWhileRevalidate strategy
registerRoute(
    ({ url }) => url.pathname.startsWith('/maps'),// Match /maps API requests
    new StaleWhileRevalidate({
        cacheName: 'maps-api-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 20,// Cache only 20 responses
                maxAgeSeconds: 12 * 60 * 60, // Cache for 12 hours
            }),
        ],
    })
);