
var _functions = {};

jQuery(function($) {
	"use strict";

	var  winW, winH, winScr, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style;

	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
	};

	// Check if mobile mobile device
	if(_ismobile) $('body').addClass('mobile');

	// Main set time out for content loaded
	setTimeout( function() {
		// Add class after page loaded
		$('body').addClass('loaded');

		// Page calculations functuin
		_functions.pageCalculations();

		// Delate main page loader
		$('#loader-wrapper').fadeOut(200);

	}, 700);

	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	$(window).scroll(function(){
		_functions.scrollCall();
		if ( $('.mapThumbnail.mapThumbStyle2').length &&  $('.mapThumbnail.mapThumbStyle2').hasClass('active') ) {
            $('.mapThumbnail.mapThumbStyle2').removeClass('active');
        }
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
	};

	//Smooth Scroll
    if(!_ismobile) SmoothScroll({ stepSize: 100 });

    var popupInfo = '';
    var countries = [];
    var countriesStyles = {};
     $("#world-map").each(function() {
    	$.each(this.attributes,function(i,a){
    		if (a.name.indexOf('data-country') != -1 ) {
    			countries.push(a.name.slice(-2).toUpperCase());
    		}
        });
    });

    for ( var i = 0; i < countries.length; i++ ) {
    	countriesStyles[countries[i]] = $("#world-map").attr('data-color-' + countries[i]);
    }
 
    $(window).load(function () {
		$('#world-map').vectorMap({
			map: 'world_mill',
			backgroundColor: '#fff',
			regionStyle: {
				initial: {
					fill: '#BBBBBB'
				}
			},
			zoomOnScroll: $(window).width()<767 ? true: false,
			series: {
				regions: [{
					values: countriesStyles,
					attribute: 'fill'
				}]
			},
			onRegionTipShow: function (e, el, code) {
                popupInfo = code;

			}
		});
	});
    $('#world-map').on('click', function (event) {
        var mapPopup = $('.mapThumbnail.mapThumbStyle2'),
            popupConent = $('#world-map').data('country-' + popupInfo.toLowerCase());

        setTimeout(function () {
            mapPopup.find('.mapContent').html('');
        },250);
        mapPopup.removeClass('active');
		countries.some(function(country){
			if (country.toLowerCase() === popupInfo.toLowerCase()) {
			    setTimeout(function () {
                    mapPopup.find('.mapContent').append(popupConent);
                    popupInfo = '';
                },300);
                setTimeout(function () {
                    mapPopup.css({
                        'top': event.clientY - (mapPopup.outerHeight() + 25),
                        'left': event.clientX - ( mapPopup.width() / 2 )
                    });
                    mapPopup.addClass('active');
                }, 350);
				return true;
			} else {
                mapPopup.removeClass('active');
                setTimeout(function () {
                    mapPopup.css({
                        'left': -10000
                    })
                    ;
                }, 350);
			}
		});
	});

    $('.closeMapThumb').on('click', function () {
        $(this).closest('.mapThumbStyle2').removeClass('active');
    });

   


});