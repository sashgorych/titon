function getDevicePixelRatio() {
    var mediaQuery;
    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if (window.devicePixelRatio !== undefined && !is_firefox) {
        return window.devicePixelRatio;
    } else if (window.matchMedia) {
        mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
          (min--moz-device-pixel-ratio: 1.5),\
          (-o-min-device-pixel-ratio: 3/2),\
          (min-resolution: 1.5dppx)";
        if (window.matchMedia(mediaQuery).matches) {
            return 1.5;
        }
        mediaQuery = "(-webkit-min-device-pixel-ratio: 2),\
          (min--moz-device-pixel-ratio: 2),\
          (-o-min-device-pixel-ratio: 2/1),\
          (min-resolution: 2dppx)";
        if (window.matchMedia(mediaQuery).matches) {
            return 2;
        }
        mediaQuery = "(-webkit-min-device-pixel-ratio: 0.75),\
          (min--moz-device-pixel-ratio: 0.75),\
          (-o-min-device-pixel-ratio: 3/4),\
          (min-resolution: 0.75dppx)";
        if (window.matchMedia(mediaQuery).matches) {
            return 0.7;
        }
    } else {
        return 1;
    }
}

$(document).ready(function(){
	var popup = $('#cookie-consent');
	var button = $('#cookie-consent-accept');
        console.log('xx', $.cookie('cookie-consent'));
	if ( ! $.cookie('cookie-consent') ) {
		// Show consent
		popup.fadeIn();
	}
                
	button.click(function(){
		$.cookie( 
                        "cookie-consent", 
                        1, 
			{ 
                            expires : 30,
                            path : '/'
	                }
		);
		popup.fadeOut();
	});        

        /*
	var scale = 1/getDevicePixelRatio();
	
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (width >= 480) {
	    //document.getElementsByTagName("meta")[0].setAttribute("content", "width=1370px, initial-scale=1, maximum-scale=1");
	    document.getElementsByTagName("meta")[0].setAttribute("content", "width=device-width, initial-scale=" + scale + ", minimum-scale=" + scale +", maximum-scale=1.0, target-densityDpi=device-dpi, " );
	} else {
	    document.getElementsByTagName("meta")[0].setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
	}
	*/

    $('a[href="#"]').click( function (e) {
        e.preventDefault();
    } );

    /*
    var open_r_more = false;    
    //$('.open-read-more').click( function () {
    $('.open-read-more').click( function () {
        $(this).prev('.full-text').slideToggle();
	if ( open_r_more == false ) {
		open_r_more = true; 
		$(this).html('Read less...');
	} else {
		open_r_more = false;
		$(this).html('Read more...');
	}
    } );

    $('.to-top').click( function () {
    	$('html, body').animate({
    	   scrollTop: 0
        }, 500);
    } );
    */

});
