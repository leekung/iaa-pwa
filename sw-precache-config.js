/* Config for offline caching with Service Worker Precache
   https://www.polymer-project.org/1.0/toolbox/service-worker
   https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md */

module.exports = {
  root: 'dist',

  /* cacheId is string used to distinguish the caches created by different web applications
     that are served off of the same origin and path.
     While serving completely different sites from the same URL is not likely to be an issue
     in a production environment, it avoids cache-conflicts when testing various projects
     all served off of http://localhost. */
  cacheId: 'iaa-pwa',

  /* Array of one or more string patterns that will be passed in to glob.
     All files matching these globs will be automatically precached by the generated service worker. */
  staticFileGlobs: [
    'dist/index.html',
    'dist/assets/**',
    'dist/OneSignalSDKWorker.js',
    'dist/OneSignalSDKUpdaterWorker.js',
    'dist/manifest.json',
    'dist/service-worker.js',
    'dist/**.svg',
    'dist/**.woff2',
    'dist/**.woff',
    'dist/**.ttf',
    'dist/**.eot',
    'dist/**.ico',
    'dist/**.js',
    'dist/**.css'
  ],

  /* Fallback document, to be served when the requested URL is not in the cache.
     For a single—page app, this is typically the same as the entrypoint. */
  navigateFallback: '/index.html',

  /* Whitelist includes all files except those that end in .html (for HTML imports) and
     ones with /data/ in the path (for dynamically-loaded data). */
  navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/|\/__|\.json|\.js$)/],

  /* Runtime Caching for Dynamic Content
     https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md#runtime-caching-for-dynamic-content */
  runtimeCaching: [{
    /* Google Analytics */
    urlPattern: /https?:\/\/((www|ssl)\.)?google-analytics\.com\/analytics.js/,
    handler: 'networkFirst'
  }, {
    /* Google Fonts
    urlPattern: /https?:\/\/fonts.+/,
    handler: 'cacheFirst'
  }, { */
    /* Examples */
    urlPattern: /^https:\/\/example\.com\/api/,
    handler: 'networkFirst'
  }, {
    urlPattern: /\/data\/images\/.*/,
    handler: 'cacheFirst',
    options: {
      cache: {
        maxEntries: 200,
        name: 'images-cache'
      }
    }
  }, {
    urlPattern: /\/data\/articles\/.*json/,
    handler: 'fastest',
    options: {
      cache: {
        maxEntries: 100,
        name: 'articles-cache'
      }
    }
  }, {
    urlPattern: /https?:\/\/query\.yahooapis\.com/,
    handler: 'networkFirst',
    options: {
      cache: {
        maxEntries: 100,
        name: 'schedule-cache'
      }
    }
  }]

};
