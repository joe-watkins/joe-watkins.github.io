// offline app
// https://developers.google.com/web/fundamentals/getting-started/your-first-offline-web-app

var serviceWorkerVersion = "static-v1"; // increment this value each update

// add polyfill for caching
importScripts('/cache-polyfill.js');

// add event listener for the "Install" phase
self.addEventListener("install", function(e){

  console.log("running within the install phase");

	// open the caches object and add all the files we want to store
	// if any fail the whole thing fails
	// here we've named it airhorner
	e.waitUntil(
		caches.open(serviceWorkerVersion).then(function(cache){
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
        'https://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzInF5uFdDttMLvmWuJdhhgs.ttf',
        'https://joe-watkins.io/accessibility/up-and-running-with-jaws-on-a-mac/',
        'https://joe-watkins.io/webdev/progressive-enhancement-and-the-2016-presidential-race/',
        'https://joe-watkins.io/webdev/migrate-from-jekyll-to-hugo/',
        'https://joe-watkins.io/accessibility/infographics-may-not-belong-on-the-web/',
        'https://joe-watkins.io/accessibility/top-people-to-follow-in-web-accessibility/',
        'https://joe-watkins.io/accessibility/commonly-abused-html-and-css-that-hurt-accessibility/',
        'https://joe-watkins.io/javascript/inline-critical-css-with-wordpress/',
        'https://joe-watkins.io/javascript/organize-your-jquery-with-object-literal-notation/',
        'https://joe-watkins.io/css-visual-regression-testing-with-grunt-backstopjs/',
        'https://joe-watkins.io/accessibility/getting-started-with-grunt-tenon-client/',
        'https://joe-watkins.io/accessibility/please-stop-using-placeholders-as-labels/',
        'https://ssl.google-analytics.com/__utm.gif?utmwv=5.6.7&utms=21&utmn=732733281&utmhn=joe-watkins.io&utmcs=UTF-8&utmsr=1440x900&utmvp=1333x375&utmsc=24-bit&utmul=en-us&utmje=0&utmfl=21.0%20r0&utmdt=JoeWatkins.io&utmhid=1603467120&utmr=0&utmp=%2F&utmht=1463943709630&utmac=UA-857864-9&utmcc=__utma%3D4393640.294469123.1463943337.1463943337.1463943337.1%3B%2B__utmz%3D4393640.1463943337.1.1.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)%3B&utmjid=&utmu=qAAAAAAAAAAAAAAAAAAAAAAE~'
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
