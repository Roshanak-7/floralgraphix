$(document).ready(function(){

//------------------------------------- Navigation setup ------------------------------------------------//
	

//--------- Scroll navigation ---------------//

$("#mainNav a, #quote a, #logo a").click(function(event){

	event.preventDefault();
	var full_url = this.href;
	var parts = full_url.split("#");
	var trgt = parts[1];
	var target_offset = $("#"+trgt).offset();
	var target_top = target_offset.top;

	$('html,body').animate({scrollTop:target_top -120}, 800);
	
});

//-------------Highlight the current section in the navigation bar------------//
var sections = $("section");
	var navigation_links = $("#mainNav a");
	
	sections.waypoint({
		handler: function(event, direction) {
		
			var active_section;
			active_section = $(this);
			if (direction === "up"){
				active_section = active_section.prev();
				} 
			
			var active_link = $('#mainNav a[href="#' + active_section.attr("id") + '"]');
			navigation_links.removeClass("active");
			active_link.addClass("active");
	

		},
		offset: '35%'
	});


//------------------------------------- End navigation setup ------------------------------------------------//


//--------------------------------- Hover animation for the elements of the portfolio --------------------------------//
				
				
				$("a.folio, a.WorksAnchor").css({ opacity: 0 });
				$('.work, .item').hover( function(){ 
					$(this).children('img').animate({ opacity: 0.50 }, 'fast');
					$(this).children('a').animate({ opacity: 1 }, 'fast');
				}, function(){ 
					$(this).children('img').animate({ opacity: 1 }, 'slow');
					$(this).children('a').animate({ opacity: 0 }, 'slow'); 
				}); 
				
			

//--------------------------------- End hover animation for the elements of the portfolio --------------------------------//

//-----------------------------------Initilaizing fancybox for the portfolio-------------------------------------------------//

	$('.portfolio a.folio, a.fancyboxAnchor , .columns_Three a, .blogPost a ').fancybox({
					'overlayShow'	: true,
					'opacity'		: true,
					'transitionIn'	: 'fade',
					'transitionOut'	: 'none',
					'overlayOpacity':   0.8,
					'titlePosition' : 'over'
				});
				
//-----------------------------------End initilaizing fancybox for the portfolio-------------------------------------------------//

	//--------------------------------- Sorting portfolio elements with quicksand plugin  --------------------------------//
	
		var $portfolioClone = $('.portfolio').clone();

		$('.filter a').click(function(e){
			$('.filter li').removeClass('current');	
			var $filterClass = $(this).parent().attr('class');
			if ( $filterClass == 'all' ) {
				var $filteredPortfolio = $portfolioClone.find('li');
			} else {
				var $filteredPortfolio = $portfolioClone.find('li[data-type~=' + $filterClass + ']');
			}
			$('.portfolio').quicksand( $filteredPortfolio, { 
				duration: 800,
				easing: 'easeInOutQuad' 
			}, function(){
					$('.item').hover( function(){ 
						$(this).children('img').animate({ opacity: 0.50 }, 'fast');
						$(this).children('a').animate({ opacity: 1 }, 'fast');
					}, function(){ 
						$(this).children('img').animate({ opacity: 1 }, 'slow');
						$(this).children('a').animate({ opacity: 0 }, 'slow');
					}); 


//------------------------------ Reinitilaizing fancybox for the new cloned elements of the portfolio----------------------------//

				$('.portfolio a.folio').fancybox({
								'overlayShow'	: true,
								'opacity'		: true,
								'transitionIn'	: 'elastic',
								'transitionOut'	: 'none',
								'overlayOpacity'	:   0.8
							});

//-------------------------- End reinitilaizing fancybox for the new cloned elements of the portfolio ----------------------------//

			});


			$(this).parent().addClass('current');
			e.preventDefault();
		});

//--------------------------------- End sorting portfolio elements with quicksand plugin--------------------------------//


//--------------------------------- Form validation --------------------------------//
//---------------------------------- Forms validation -----------------------------------------//
	
	/*click handler on the submit button*/
	$('#submit').click(function(){ 
		$('.error').fadeOut('slow'); 
		
		var error = false; 
		var name = $('input#name').val(); 
		if(name == "" || name == " ") {
			$('#err-name').fadeIn('slow'); 
			error = true; 
		}
		
		
			var msg = $('textarea#message').val(); 
			if(msg == "" || msg == " ") {
				$('#err-message').fadeIn('slow'); 
				error = true; 
			}
		
		var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; 
		var email = $('input#email').val(); 
		if (email == "" || email == " ") { 
			$('#err-email').fadeIn('slow'); 
			error = true;
		}else if (!email_compare.test(email)) { 
			$('#err-emailvld').fadeIn('slow'); 
			error = true;
		}

		if(error == true) {
			return false;
		}

		var data_string = $('.contactForm').serialize(); 
		

		$.ajax({
			type: "POST",
			url: $('.contactForm').attr('action'),
			data: data_string,
			timeout: 6000,
			error: function(request,error) {
				if (error == "timeout") {
					$('#err-timedout').fadeIn('slow');
				}
				else {
					$('#err-state').fadeIn('slow');
					$("#err-state").html('An error occurred: ' + error + '');
				}
			},
			success: function() {
					$('#success').fadeIn('slow');
						}
		});

		return false; 
	}); 
//---------------------------------- End forms validation -----------------------------------------//

//---------------------------------- Google map location -----------------------------------------//
	
	
	
/*
	var pointer = {
			path: google.maps.SymbolPath.CIRCLE,
		    fillOpacity: 1,
		    fillColor: '#04C3A5',
		    strokeOpacity: 0,
		    scale: 10
	};*/
/*----------------------------------------------------------
This eliminates the Map, to bring it back just add <div id="map"></div> and uncomment the following script


// Create an array of styles.
var styles = [
		        {
		            stylers: [
		                { saturation: -200 }
						
		            ]
		        },{
		            featureType: 'road',
		            elementType: 'geometry',
		            stylers: [
		                { hue: "#cccccc" },
		                { visibility: 'simplified' }
		            ]
		        },{
		            featureType: 'road',
		            elementType: 'labels',
		            stylers: [
		                { visibility: 'off' }
		            ]
		        }
		      ],
				
				// Lagitute and longitude for your location goes here
				
		       lat = 43.825332,
		       lng = -79.539238,
		
			  // Create a new StyledMapType object, passing it the array of styles,
			  // as well as the name to be displayed on the map type control.
		      customMap = new google.maps.StyledMapType(styles,
		          {name: 'Styled Map'}),
		
			// Create a map object, and include the MapTypeId to add
			// to the map type control.
		      mapOptions = {
		          zoom: 14,
		          center: new google.maps.LatLng( lat, lng ),
		          mapTypeControlOptions: {
		              mapTypeIds: [google.maps.MapTypeId.ROADMAP]
		          }
		      },
		      map = new google.maps.Map(document.getElementById('map'), mapOptions),
		      myLatlng = new google.maps.LatLng( lat, lng ),

		      marker = new google.maps.Marker({
		        position: myLatlng,
		        map: map,
				icon: "images/marker.png"
		      });
		
		
				
				
			  //Associate the styled map with the MapTypeId and set it to display.
		      map.mapTypes.set('map_style', customMap);
		      map.setMapTypeId('map_style');
	
//---------------------------------- End google map location -----------------------------------------//
*/





//---------------------------------- Testimonials-----------------------------------------//
$('#testimonials').slides({
	preload: false,
	generateNextPrev: false,
	play: 4500,
	container: 'testimoniaContainer'
});
//---------------------------------- End testimonials-----------------------------------------//


//-------------------------------------------------Flex slider --------------------------------------------------//
/*
			namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
			selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
			animation: "fade",              //String: Select your animation type, "fade" or "slide"
			easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
			direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
			reverse: false,                 //{NEW} Boolean: Reverse the animation direction
			animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
			smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
			startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
			slideshow: true,                //Boolean: Animate slider automatically
			slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
			animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
			initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
			randomize: false,               //Boolean: Randomize slide order
			 
			// Usability features
			pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
			pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
			useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
			touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
			video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
			 
			// Primary Controls
			controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
			directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
			prevText: "Previous",           //String: Set the text for the "previous" directionNav item
			nextText: "Next",               //String: Set the text for the "next" directionNav item
			 
			// Secondary Navigation
			keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
			multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
			mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
			pausePlay: false,               //Boolean: Create pause/play dynamic element
			pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
			playText: 'Play',               //String: Set the text for the "play" pausePlay item
			 
			// Special properties
			controlsContainer: "",          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
			manualControls: "",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
			sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
			asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
			 
			// Carousel Options
			itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
			itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
			minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
			maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
			move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
											 
			// Callback API
			start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
			before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
			after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
			end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
			added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
			removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
*/

$('.flexslider').flexslider({
   animation: "fade",
   slideshowSpeed: 5000
});
//------------------------------------------------- End flex slider --------------------------------------------------//

		
});





