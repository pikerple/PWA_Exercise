/*
* Copyright 2018 Google Inc. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {

  workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "8d777d21ce01b6374f5a7f635acda0c2"
  },
  {
    "url": "images/logo.png",
    "revision": "b3d7c4eaefdd3d30e348a56d8048bf68"
  },
  {
    "url": "images/touch/icon-128x128.png",
    "revision": "c2c8e1400d6126ea32eaac29009733a9"
  },
  {
    "url": "images/touch/icon-192x192.png",
    "revision": "571f134f59f14a6d298ddd66c015b293"
  },
  {
    "url": "images/touch/icon-256x256.png",
    "revision": "848055c2f5d42b0c405cff37739261e9"
  },
  {
    "url": "images/touch/icon-384X384.png",
    "revision": "a1be08eac51e8ff734a337b90ddc1c16"
  },
  {
    "url": "images/touch/icon-512x512.png",
    "revision": "b3d7c4eaefdd3d30e348a56d8048bf68"
  }
]);

  workbox.skipWaiting();
  workbox.clientsClaim();

  workbox.routing.registerRoute(
    new RegExp('https://hacker-news.firebaseio.com/v0/(.*)'),
    workbox.strategies.cacheFirst({
        networkTimetoutSeconds: 5,
        cacheName: 'stories',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 300,
            maxAgeSeconds: 5 * 60, // 5 minutes
          })
        ]
    })
  );
  workbox.routing.registerRoute(
    new RegExp('http://newsapi.org/v2/(.*)'),
    workbox.strategies.networkFirst({
        networkTimetoutSeconds: 5,
        cacheName: 'articles',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 300,
            maxAgeSeconds: 5 * 60, // 5 minutes
          })
        ]
    })
  );
  

  workbox.routing.registerRoute(
    new RegExp('https://cdn.polyfill.io/(.*)'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'polyfills'
    })
  );

} else {
  console.log(`Workbox didn't load 😬`);
}
