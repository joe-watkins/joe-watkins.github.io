// Service Worker
var serviceWorkerVersion = "static-v3";
importScripts("cache-polyfill.js"), self.addEventListener("install", function(e) {
    console.log("running within the install phase"), e.waitUntil(caches.open(serviceWorkerVersion).then(function(e) {
        return e.addAll(["./", "javascript/jquery.js","index.html", "styles/base.min.css", "styles/main.min.css"])
    }))
}), self.addEventListener("fetch", function(e) {
    e.respondWith(caches.match(e.request).then(function(s) {
        return s || fetch(e.request)
    }))
});
