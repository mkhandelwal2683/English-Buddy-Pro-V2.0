/* ==========================================
   English Buddy Pro v2.0
   Service Worker
========================================== */

const CACHE_NAME = "english-buddy-v2";

const FILES_TO_CACHE = [

"/",
"./",
"./index.html",

"./manifest.json",

"./css/theme.css",
"./css/style.css",
"./css/responsive.css",

"./js/app.js",
"./js/navigation.js"

];

/* ==========================================
   Install
========================================== */

self.addEventListener("install", event => {

console.log("Installing Service Worker...");

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {

return cache.addAll(FILES_TO_CACHE);

})

);

self.skipWaiting();

});

/* ==========================================
   Activate
========================================== */

self.addEventListener("activate", event => {

console.log("Service Worker Activated");

event.waitUntil(

caches.keys().then(keys => {

return Promise.all(

keys.map(key => {

if (key !== CACHE_NAME) {

return caches.delete(key);

}

})

);

})

);

self.clients.claim();

});

/* ==========================================
   Fetch
========================================== */

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)

.then(response => {

if (response) {

return response;

}

return fetch(event.request)

.then(networkResponse => {

return networkResponse;

})

.catch(() => {

return caches.match("./index.html");

});

})

);

});
