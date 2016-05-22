$(document).ready(function(){

	var Engine = {

		ui : {

			mainNav : function(){

				var $navicon = $(".navicon"),
						$mainNav = $("#site-navigation"),
						$mainNavLinks = $mainNav.find("a"),
						mainNavHeight = $mainNav.outerHeight(),
						showNavClass = "show-navigation";

						$navicon.on("click", function(e){
							e.preventDefault();
							$("body").toggleClass(showNavClass);
							var navIsVisible = $("body").hasClass(showNavClass);
							$mainNav.toggleAria({aria: "hidden"});
							if(navIsVisible){
								$mainNav.focus();
							}
						});

						$mainNav.on("focus",function(){
							$("body").addClass(showNavClass);
						});

			}, // main nav

			highlightjs : function(){
				$('pre code').each(function(i, block) {
					hljs.highlightBlock(block);
				});
			}, // highlightjs

			offlineSupport: function(){

				var serviceWorkerFile = "/sw.js",
						offlineClass = "no-network-connection";

				if(navigator.serviceWorker){
					_registerServiceWorker();
				}

				function _registerServiceWorker(){
					navigator.serviceWorker.register(serviceWorkerFile).then(function(){
						console.log("service worker running");
					}).catch(function(){
						console.log("nope there was a problem");
					});
				}

				// handle no network
				window.addEventListener("offline", _showOfflineMessage, false);

				window.addEventListener("online", _killOfflineMessage, false);

				function _showOfflineMessage(){
					$("body").addClass(offlineClass).show();
					setTimeout(function(){
						$(".offline-message")
							.attr("aria-hidden",false)
							.focus();
					},300);
				}

				function _killOfflineMessage(){
					$("body").removeClass(offlineClass).hide();
					$(".offline-message")
						.attr("aria-hidden",true);
				}

			} // offlineSupport

		} // ui

	} // Engine

	Engine.ui.mainNav();
	Engine.ui.highlightjs();
	Engine.ui.offlineSupport();

});
