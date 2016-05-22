// offline app
// https://developers.google.com/web/fundamentals/getting-started/your-first-offline-web-app

// add polyfill for caching
importScripts('/cache-polyfill.js');

// add event listener for the "Install" phase
self.addEventListener("install", function(e){

  console.log("running within the install phase");

	// open the caches object and add all the files we want to store
	// if any fail the whole thing fails
	// here we've named it airhorner
	e.waitUntil(
		caches.open('static-v1').then(function(cache){
			return cache.addAll([
				'/',
				'/index.html',
        '/js/main.min.js',
        '/styles/main.min.css',
        '/images/angle.svg',
        '/images/angle-alt.svg',
        '/images/jojo.jpg',
        '/images/bg-city.jpg',
        'https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf',
        'https://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzInF5uFdDttMLvmWuJdhhgs.ttf'

			]) // addAll()
		}) // .open()
	); // waitUntil

}); // install

// listen for a request
// intercept and check cache
self.addEventListener('fetch',function(event){
	// console.log(event.request);
	event.respondWith(
		caches.match(event.request).then(function(response){
			return response || fetch(event.request);
		})
	)
});
