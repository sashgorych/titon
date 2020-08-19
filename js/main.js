//////////start menu script
let hamburger = document.querySelector('.nav-mobile');
let menu = document.querySelector('.menu');
const toggleMenu = () => {
    closeAllSubMenus();
    menu.classList.toggle('active');
    hamburger.classList.toggle('active')
};
//toggle menu
hamburger.addEventListener('click', e => {
    e.stopPropagation();
    e.preventDefault();
    toggleMenu();
    $('.phone-number').toggleClass('active')
    $('body').toggleClass('active')
});
//close all submenu
const closeAllSubMenu = () => {
    let activeSubMenu = menu.querySelector('.active');
    if (activeSubMenu) {
        activeSubMenu.classList.remove('active');
    }

};

//close mobile submenu in menu
function closeAllSubMenus() {
    closeAllSubMenu();
    closeAllSubMenu2();
}
//close all submenu lvl2
const closeAllSubMenu2 = () => {
    let activeSubMenuLvl2 = menu.querySelector('.active2');
    if (activeSubMenuLvl2) {
        activeSubMenuLvl2.classList.remove('active2');
    }
};
//toggle submenu

//prevent redirection in new menu(real estate)
// if($('.menu-mobile-on-desk').length) {
//     $('.menu-mobile-on-desk nav ul.menu li.hasDrop-l2 > a').click(function (e) {
// 	$(this).next().hide();
//     })
//     $('.menu-mobile-on-desk nav ul.menu li.hasDrop > a').click(function (e) {
// 	$(this).next().hide();
//         $(this).parent().removeClass('active')
//     })
// }
menu.addEventListener('click', (e) => {
    let target = e.target;
    //check submenu lvl 1
    if (target.classList.contains('hasDrop')) {

        if (target.classList.contains('active')) {
            //close if open
            target.classList.remove('active')
            closeAllSubMenu();
            closeAllSubMenu2();
        } else {
            closeAllSubMenu();
            closeAllSubMenu2();
            //close other submenu and open current
            target.classList.add('active')
        }
    } else {
        if (target.parentNode.classList.contains('hasDrop')) {
                //if click on link(tag a)
            if (target.parentNode.classList.contains('active')) {
                // if submenu open - close
                target.parentNode.classList.remove('active')
                closeAllSubMenu();
                closeAllSubMenu2();
            } else {
                // closeAllSubMenu();
                // closeAllSubMenu2();
                // target.parentNode.classList.add('active')
            }

        }
    }
    //check sub menu lvl 2

    if (target.classList.contains('hasDrop-l2')) {

        if (target.classList.contains('active2')) {
            target.classList.remove('active2')
            closeAllSubMenu2();
        } else {
            closeAllSubMenu2();
            target.classList.add('active2')
        }
    } else {
        if (target.parentNode.classList.contains('hasDrop-l2')) {
// if click on tag a
            if (target.parentNode.classList.contains('active2')) {
                target.parentNode.classList.remove('active2')
                closeAllSubMenu2();
            } else {
                closeAllSubMenu2();
               // target.parentNode.classList.add('active2')
            }


        }
    }
})
//close menu when click outside
document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == hamburger;
    let menu_is_active = menu.classList.contains('active');
    if (!its_menu && !its_hamburger && menu_is_active) {
        toggleMenu();
        $('.phone-number').removeClass('active')
        $('body').removeClass('active')

    }
})
////////////end menu script


////////////start form validation
function alphanumeric(data) {
    let letters = /^[a-zA-Z ]+$/;
    if (letters.test(data)) {
        return true;
    }
    return false;
}

//input mask for phone
// $('.phone_us').mask('(000) 000-0000', {placeholder: "___.___.____"} );

//slick slider
if (document.querySelector(".single-item")) {
    $('.single-item').slick({
        dots: true,
        arrows: false
    });
}

if (document.querySelector(".slider-header")) {
    $('.slider-header').slick({
        dots: false,
        arrows: false,
        speed: 500,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        pauseOnHover:false,
        adaptiveHeight: true

    });
}

//map
let listHtml = document.querySelector('#map-frame-list');
let map = document.querySelector('#map-frame');

if (listHtml) {
    listHtml.addEventListener('click', (e) => {
        let cityName = e.target.dataset.name;
        if (!cityName) {
            return
        }
        let src = getSrcByCity(cityName, listsrc)
        map.src = src;
        deleteActiveClass();
        setActiveCity(e.target);
    })
}

function getSrcByCity(city, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == city) {
            return arr[i].src;
        }
    }
}

function setActiveCity(element) {
    element.classList.add('active')
}

function deleteActiveClass() {
    listHtml.querySelector('.active').classList.remove('active');
}

let customslider = document.querySelector('.slider-in');
if (customslider) {
    $('.slider-in').slick({
        dots: false,
        infinite: true,
        arrows: true,
        autoplay: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        adaptiveHeight: true

    });
}

let blogpage = document.querySelector('.blog-page')
if (blogpage) {

}
let gallerylvl2 = document.querySelector('.gallery-lvl2')
if (gallerylvl2) {
    $('.gallery-row-content').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        }
    });
}

if ( $('.slider-gallery').length ) {
    $('.slider').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        }
    });

    $('.slider-gallery').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1035,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

if( $('.faq').length){
    //faq
    const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

    accordionItemHeaders.forEach(accordionItemHeader => {
        accordionItemHeader.addEventListener("click", event => {


            const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
            if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
                currentlyActiveAccordionItemHeader.classList.toggle("active");
                currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
            }

            accordionItemHeader.classList.toggle("active");
            const accordionItemBody = accordionItemHeader.nextElementSibling;
            if (accordionItemHeader.classList.contains("active")) {
                accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
            }
            else {
                accordionItemBody.style.maxHeight = 0;
            }

        });
    });
}

if( $('.block-with-items-lines').length){
//additional services hide more items on mobile. show only first four
    if (screen.width < 768) {
        $('.show-more-block .item:not(:nth-child(-n+4))').addClass('hidden')
    }


//second page read more btn

    let btn_read_more = document.querySelector('#read-more-advantages');
    if ( btn_read_more != null ) {
	    btn_read_more.addEventListener('click', function (e) {
	        e.preventDefault();
	        document.querySelector('.content-read-more').classList.toggle('show');
	        btn_read_more.classList.toggle('active');
	        if (btn_read_more.innerHTML == 'show less') {
	            btn_read_more.innerHTML = 'read more'
	        } else {
	            btn_read_more.innerHTML = 'show less'

	        }
	    })
    }
//second page show more btn
//     let btn_show_more = document.querySelector('#show_more');
//     if ( btn_show_more != null ) {
// 	    btn_show_more.addEventListener('click', function (e) {
// 	        e.preventDefault();
// 	        document.querySelector('.show-more-block').classList.toggle('active');
// 	        btn_show_more.classList.toggle('active');
// 	        if (btn_show_more.innerHTML == 'show less') {
// 	            btn_show_more.innerHTML = 'show more'
// 	        } else {
// 	            btn_show_more.innerHTML = 'show less'
//
// 	        }
// 	    })
//     }
    if ( $('.show_more_btn_common').length) {
        $('.show_more_btn_common').click(function (e) {
            e.preventDefault();
            let target = $( event.target );
            target.parent().find('.show-more-block').toggleClass('active')
            target.toggleClass('active')
            console.log(target.text())
            if (target.text() == 'show less') {
                target.text('show more');
            } else {
                target.text('show less');

            }
        })
    }

    //second page review open/close
    $('.reviews-container-content-second-page .item').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $('.reviews-container-content-second-page .item.active').removeClass('active')
                $(this).addClass('active');
            }

        }
    )
}
let gallery_page = document.querySelector('.gallery-page');
if (gallery_page) {
    $('.gallery-row-content').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.el.attr('title');
                }
            }
        });
    })

    $('.hide').hide();

    // $('.btn-view-a').click(function (e) {
    //     e.preventDefault();
    //     let btn = e.target;
    //     let parent = $(this).parent().parent();
    //     parent.toggleClass('active')
    //     $(this).parent().parent().find('.hide').toggle();
    //     if( btn.innerHTML == "show less"){
    //         btn.innerHTML = 'view all'
    //     }else{
    //         btn.innerHTML = 'show less'
    //
    //     }
    //
    // })
}
let gallery_page2 = document.querySelector('.gallery-page2');
if (gallery_page2) {
    $('.gallery-row-content').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.el.attr('title');
                }
            }
        });
    })

    $('.hide').hide();

    $('.btn-view-a').click(function (e) {
        e.preventDefault();
        let btn = e.target;
        let parent = $(this).parent().parent();
        parent.toggleClass('active')
        $(this).parent().parent().find('.hide').toggle();
        if (btn.innerHTML == "show less") {
            btn.innerHTML = 'view all'
        } else {
            btn.innerHTML = 'show less'

        }

    })
}


for (const dropdown of document.querySelectorAll(".custom-select-wrapper")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.custom-select').classList.toggle('open');
    })
}

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
        }
    })
}


window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.custom-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});


let realEstateFilter = (function () {
    function loadData() {

    }

    function onSelected() {

    }

    return {
        init: loadData
    }
})


let blognavs = document.querySelector('.blog-navs');
if (blognavs) {
    document.querySelector('.blog-navs').addEventListener('click', function (e) {
        let category;
        let button = e.target.parentElement;
        if (button.dataset.category) {
            category = button.dataset.category;
        }
        if (category) {
            hideAllBlogRecords();
            if (category == 'all') {
                showAllBlogRecords()
            } else {
                showCategoryRecords(category, button)
            }
        }
    })
}

function showCategoryRecords(category, button) {
    button.classList.add('active')
    category = "." + category;
    document.querySelectorAll(category).forEach(el => {
        el.classList.add('active')
    })
}

function hideAllBlogRecords() {
    document.querySelector('.blog-navs').querySelector('.active').classList.remove('active')
    document.querySelector('.blog-section-content').querySelectorAll('.item').forEach(el => {
        el.classList.remove('active')
    })
}

function showAllBlogRecords() {
    document.querySelector('.blog-navs').querySelector('li:nth-child(1)').classList.add('active')
    document.querySelector('.blog-section-content').querySelectorAll('.item').forEach(el => {
        el.classList.add('active')
    })
}

$(document).ready(function () {
    //set 100vh in mobile browser

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    console.log('ee')
})


// var lastScrollTop = 0;
//
// $(window).scroll(function(event){
//     let isopened = document.querySelector('body').classList.contains("active")
//     if(!isopened) {
//         var st = $(this).scrollTop();
//         if (st > lastScrollTop || st<200) {
//             setTimeout(function () {
//                 document.querySelector(".header").classList.remove("sticky");
//
//             }, 400)
//             document.querySelector(".header").classList.remove("active");
//
//         } else {
//             document.querySelector(".header").classList.add("sticky");
//             setTimeout(function () {
//                 document.querySelector(".header").classList.add("active");
//
//             }, 100)
//         }
//         lastScrollTop = st;
//     }
// });
//
//fix menu
var scrollableElement = document.body; //document.getElementById('scrollableElement');

scrollableElement.addEventListener('wheel', checkScrollDirection);
var menuTimeOut;

function checkScrollDirection(event) {
    let isActiveMenu = document.querySelector('body').classList.contains("active");

    if (checkScrollDirectionIsUp(event) && event.pageY > 900)

    {
        clearTimeout(menuTimeOut);
        //up
        document.querySelector(".header").classList.add("sticky");
        menuTimeOut = setTimeout(function () {
            document.querySelector(".header").classList.add("active");

        }, 100)
    }
    else
    {
        if (event.pageY < 900 && !isActiveMenu) {
            document.querySelector(".header").classList.remove("sticky");
            document.querySelector(".header").classList.remove("active");
        } else {
            if (!isActiveMenu) {
                //down
                clearTimeout(menuTimeOut);
                menuTimeOut = setTimeout(function () {
                    document.querySelector(".header").classList.remove("sticky");

                }, 400)
                document.querySelector(".header").classList.remove("active");
            }
        }
    }
}

function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}
$('.filters-real-estate li').click(function () {
    $(this).toggleClass('active')
})

//slider of projects
if($('.slider-projects').length){
    $('.slider-projects').slick({
        dots: false,
        infinite: false,
        speed: 300,
        arrows:true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1335,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}
if($('.reviews-container-content-second-page').length){
    $('.slick-slider-reviews').slick({
        dots: false,
        infinite: false,
        speed: 300,
        arrows:false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1335,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

//add overflow unset for header when menu have big menu
if($('.header-top:not(.menu-mobile-on-desk) .li_big_menu').length){
    $('body').addClass('non-ofh');
}