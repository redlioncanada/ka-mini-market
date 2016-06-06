var resizeBrandLogos = (function() {
	var brandElements	//reference to the brand logos
	var timeout

	$(document).ready(function() {
		brandElements = $('.ka-mini-market .branded')
		setTimeout(resizeBrandElements, 300)
	})

	$(window).resize(function() {
		resizeBrandElements()
	})

	function resizeBrandElements() {
		var width = brandElements.width()
		if (width != 0) brandElements.height(width)
		if (width == 0) {
			timeout = setTimeout(resizeBrandElements, 300)
		}
	}
})()

// @if env='dev'
//conditional via gulp-preprocess
var analyticsImplementation = (function() {
	gaw.verbose(true)
})()
// @endif