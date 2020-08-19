$(document).ready(function(){
	$('#header-middle-line').removeClass('alt-active');

        if ($(document).width() <= 480 ) {
		//$('#header-middle-line').removeClass('alt-active');
        } else {
		//$('#header-middle-line').addClass('alt-active');
        }

   $('.rew-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        focusOnSelect: false,
        arrows: true,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    centerMode: false,
                    arrows: false
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $('.b-a-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        fade: true,
        centerMode: false,
        focusOnSelect: false,
        arrows: false,
        autoplay: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    arrows: false
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});