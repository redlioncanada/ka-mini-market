var resizeBrandLogos = (function() {
	var brandElements	//reference to the brand logos

	$(document).ready(function() {
		brandElements = $('.brand')
		resizeBrandElements()
	})

	$(window).resize(function() {
		resizeBrandElements()
	})

	function resizeBrandElements() {
		var width = brandElements.width()
		if (width != 0) brandElements.height(width)
	}
})()

// @if env='dev'
//conditional via gulp-preprocess
var analyticsImplementation = (function() {
	gaw.verbose(true)
})()
// @endif