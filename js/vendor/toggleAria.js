/*!
* toggleAria.js
* Author: Joe Watkins - joe-watkins.io
* usage:

HTML
<button aria-pressed="false">Show Content</button>

$("button").on("click", function(){
$(this).toggleAria({aria: "pressed"});
});

*
*/
(function($){

	$.fn.toggleAria = function(options) {

		var defaults = {
			wrapper: this,
			aria: ""
		},

		options =  $.extend(defaults, options),
		o = options,

		currentState = $(o.wrapper).attr("aria-"+o.aria),
		newState;

		if(currentState == "false"){
			newState = "true";
		}else{
			newState = "false";
		}

		$(o.wrapper).attr("aria-"+o.aria,newState);

	}; // $.fn

}(jQuery));
