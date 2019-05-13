;(function () {
	
	'use strict';

	function readClubInfo(callback) {
		return firebase
		.database()
		.ref("/Info/")
		.once("value", function(snapshot) {
			var myValue = snapshot.val();

			var keyList = Object.keys(myValue);
			//console.log(keyList);

			for (var i = 0; i < keyList.length; i++) {
			let details = [];
			var currKey = keyList[i];
			details.push(currKey);
			details.push(myValue[currKey].Brief);
			details.push(myValue[currKey].Category);
			details.push(myValue[currKey].Member);
			details.push(myValue[currKey].GenderRatio);
			details.push(myValue[currKey].Fee);
			details.push(myValue[currKey].Description);

			//console.log(details);
			makeClubDiv(details[0], details[1], details[2], details[3], details[4], details[5], details[6]);
			}

			callback();
		});
	}

	function makeClubDiv(name, brief, category, member, ratio, fee, description) {
		var place = document.getElementById("clubs");
		var node = document.createElement("div");

		//node.setAttribute("class", "col-md-3 animate-box");
		node.setAttribute("data-animate-effect", "fadeInTop");

		switch (category) {
		case "Sports":
			node.setAttribute("class", "col-md-3 animate-box Sports single-club");
			break;

		case "Culture":
			node.setAttribute("class", "col-md-3 animate-box Culture single-club");
			break;

		case "Academic":
			node.setAttribute("class", "col-md-3 animate-box Academic single-club");
			break;

		case "Music":
			node.setAttribute("class", "col-md-3 animate-box Music single-club");
			break;

		case "Community Service":
			node.setAttribute("class", "col-md-3 animate-box CommunityService single-club");
			break;

		case "Others":
			node.setAttribute("class", "col-md-3 animate-box Others single-club");
			break;

		default:
		}

		var node2 = document.createElement("div");

		node2.setAttribute("class", "project");
		node2.setAttribute(
		"style",
		"border: 2px solid; border-color: #2c98f0; background-color: rgba(44,152,240, 0.2); vertical-align: middle;"
		);

		var node3 = document.createElement("div");

		node3.setAttribute("class", "desc");

		var node4 = document.createElement("div");

		node4.setAttribute("class", "con");

		var nameNodeHeader = document.createElement("h3");

		var nameNode = document.createElement("a");

		nameNode.setAttribute("href", "#");
		nameNode.innerText = name;

		var briefNode = document.createElement("span");

		briefNode.innerText = description;

		var add_icon = document.createElement("i");
		add_icon.setAttribute("class", "fas fa-plus");
		add_icon.setAttribute("style", "float: right; padding-top: 20px; padding-right: 20px; color: #333333;");

		nameNodeHeader.appendChild(nameNode);

		node4.appendChild(nameNodeHeader);
		node3.appendChild(add_icon);
		node4.appendChild(briefNode);

		//secondary
		var node3_2 = document.createElement("div");

		node3_2.setAttribute("class", "desc2");

		var node4_2 = document.createElement("div");

		node4_2.setAttribute("class", "con2");
		//node4_2.setAttribute("style", "margin: 0 auto; left: 50%");

		var nameNodeHeader_2 = document.createElement("h3");

		var nameNode_2 = document.createElement("a");

		nameNode_2.setAttribute("href", "#");
		nameNode_2.innerText = name;

		var briefNode_2 = document.createElement("div");
		briefNode_2.setAttribute("class", "brief-sort");

		briefNode_2.innerText = brief;

		nameNodeHeader_2.appendChild(nameNode_2);
		
		//append briefNode, ratioNode, memberNode, feeNode to node4_2 --> put all info?
		// Read again from db with filter??
		
		//var listing = document.createElement("ul");

		//var newLine = document.createElement("br");

		var memberNode_2 = document.createElement("div");
		var group_icon = document.createElement("i");

		memberNode_2.setAttribute("class", "member-sort");
		group_icon.setAttribute("class",  "fas fa-user-friends");
		
		var ratioNode_2 = document.createElement("div");
		var money_icon = document.createElement("i");

		ratioNode_2.setAttribute("class", "ratio-sort");
		money_icon.setAttribute("class", "fas fa-dollar-sign");

		var feeNode_2 = document.createElement("div");
		var gender_icon = document.createElement("i");

		feeNode_2.setAttribute("class", "fee-sort");
		gender_icon.setAttribute("class", "fas fa-venus-mars");

		memberNode_2.innerText = member;
		ratioNode_2.innerText = ratio;
		feeNode_2.innerText = fee;




		node4_2.appendChild(nameNodeHeader_2);
		
		node4_2.appendChild(briefNode_2);
		//node4_2.appendChild(newLine);
		node4_2.appendChild(group_icon);
		node4_2.appendChild(memberNode_2);
		//node4_2.appendChild(newLine);
		node4_2.appendChild(gender_icon);
		node4_2.appendChild(ratioNode_2);
		//node4_2.appendChild(newLine);
		node4_2.appendChild(money_icon);
		node4_2.appendChild(feeNode_2);

		//node4_2.appendChild(listing);

		node3_2.appendChild(node4_2);

		node3.appendChild(node4);

		node2.appendChild(node3);

		node2.appendChild(node3_2);

		node.appendChild(node2);

		place.appendChild(node);
		//place.insertBefore(node, place.children[1]);
	}




	//Categories Page Category Selection
	var ShowAll = function() {
		if (
		$(".Category_Academic").hasClass("inactive") &&
		$(".Category_Culture").hasClass("inactive") &&
		$(".Category_CommunityService").hasClass("inactive") &&
		$(".Category_Music").hasClass("inactive") &&
		$(".Category_Sports").hasClass("inactive") &&
		$(".Category_Others").hasClass("inactive")
		) {
		$(".Academic").show();
		$(".Culture").show();
		$(".CommunityService").show();
		$(".Music").show();
		$(".Sports").show();
		$(".Others").show();
		}
	};

	$(".Category_Academic").click(function() {
		console.log("academic");
		//inactive -> active
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "blue");
		}
		//active -> inactive
		else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_Culture").click(function() {
		console.log("culture");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "red");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_CommunityService").click(function() {
		console.log("community service");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "green");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_Music").click(function() {
		console.log("music");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "brown");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_Sports").click(function() {
		console.log("sports");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "purple");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_Others").click(function() {
		console.log("others");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "orange");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	var ShowHide = function() {
		if ($(".Category_Academic").hasClass("active")) {
		$(".Academic").show();
		} else {
		$(".Academic").hide();
		}

		if ($(".Category_Culture").hasClass("active")) {
		$(".Culture").show();
		} else {
		$(".Culture").hide();
		}

		if ($(".Category_CommunityService").hasClass("active")) {
		$(".CommunityService").show();
		} else {
		$(".CommunityService").hide();
		}

		if ($(".Category_Music").hasClass("active")) {
		$(".Music").show();
		} else {
		$(".Music").hide();
		}

		if ($(".Category_Sports").hasClass("active")) {
		$(".Sports").show();
		} else {
		$(".Sports").hide();
		}

		if ($(".Category_Others").hasClass("active")) {
		$(".Others").show();
		} else {
		$(".Others").hide();
		}
		ShowAll();
	};


	// Filter Buttons
	$(".fas").hover(function(){
		$(this).css("cursor","pointer");
	});
	$(".Member .down").click(function(){
		$(".Member .up .fa-caret-up").css("color","black");
		$(".Member .down .fa-caret-down").css("color","red");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=MemberCount]').is(':checked')) {
			console.log("in member!");
			memberSortDOWN();
		};
	});

	$(".Member .up").click(function(){
		$(".Member .up .fa-caret-up").css("color","green");
		$(".Member .down .fa-caret-down").css("color","black");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=MemberCount]').is(':checked')) {
			console.log("in member!");
			memberSortUP();
		};
		
	})
	$(".Fee .down").click(function(){
		$(".Fee .up .fa-caret-up").css("color","black");
		$(".Fee .down .fa-caret-down").css("color","red");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=Fee]').is(':checked')) {
			console.log("in fee!");
			feeSortDOWN();
		};
		

	})
	$(".Fee .up").click(function(){
		$(".Fee .up .fa-caret-up").css("color","green");
		$(".Fee .down .fa-caret-down").css("color","black");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=Fee]').is(':checked')) {
			console.log("in fee!");
			feeSortUP();
		};
		
	})
	$(".Gender .down").click(function(){
		$(".Gender .up .fa-caret-up").css("color","black");
		$(".Gender .down .fa-caret-down").css("color","red");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=GenderRatio]').is(':checked')) {
			console.log("in ratio!");
			genderSortDOWN();
		};
	})
	$(".Gender .up").click(function(){
		$(".Gender .up .fa-caret-up").css("color","green");
		$(".Gender .down .fa-caret-down").css("color","black");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=GenderRatio]').is(':checked')) {
			console.log("in ratio!");
			genderSortUP();
		};
	})


	function memberSortUP() {
		var listElements = document.querySelectorAll(".single-club");
		
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".member-sort").innerText === b.querySelector('.member-sort').innerText)
				return 0;
			
			if (a.querySelector(".member-sort").innerText <= b.querySelector('.member-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};

		//only show member-sort
		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").show();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").show();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
	};

	function feeSortUP() {
		var listElements = document.querySelectorAll(".single-club");
					
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".fee-sort").innerText === b.querySelector('.fee-sort').innerText)
				return 0;
			
			if (a.querySelector(".fee-sort").innerText <= b.querySelector('.fee-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};


		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").hide();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").show();

		$(".con2").children(".fa-user-friends").hide();
		$(".con2").children(".fa-dollar-sign").show();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
	};


	function genderSortUP() {
		var listElements = document.querySelectorAll(".single-club");
					
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".ratio-sort").innerText === b.querySelector('.ratio-sort').innerText)
				return 0;
			
			if (a.querySelector(".ratio-sort").innerText <= b.querySelector('.ratio-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};

		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").hide();
		$(".con2").children(".ratio-sort").show();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").hide();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").show();

		callDefault();
	};

	function memberSortDOWN() {
		var listElements = document.querySelectorAll(".single-club");
		
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".member-sort").innerText === b.querySelector('.member-sort').innerText)
				return 0;
			
			if (a.querySelector(".member-sort").innerText >= b.querySelector('.member-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};

		//only show member-sort
		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").show();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").show();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
	};


	function feeSortDOWN() {
		var listElements = document.querySelectorAll(".single-club");
					
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".fee-sort").innerText === b.querySelector('.fee-sort').innerText)
				return 0;
			
			if (a.querySelector(".fee-sort").innerText >= b.querySelector('.fee-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};


		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").hide();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").show();

		$(".con2").children(".fa-user-friends").hide();
		$(".con2").children(".fa-dollar-sign").show();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
	};


	function genderSortDOWN() {
		var listElements = document.querySelectorAll(".single-club");
					
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".ratio-sort").innerText === b.querySelector('.ratio-sort').innerText)
				return 0;
			
			if (a.querySelector(".ratio-sort").innerText >= b.querySelector('.ratio-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};

		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").hide();
		$(".con2").children(".ratio-sort").show();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").hide();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").show();

		callDefault();
	};


	//Filtering categories div
	// This has to work whenever (1) radio changes (2) category filter changes
	function applyFilter() {
       
		$('input[type=radio][name=opt]').change(function() {
			
			

			if (this.value == "MemberCount") {
				console.log("member clicked");
				$(this).prop("checked", true).trigger("click");
				if ($('.m1').css('color') === 'rgb(0, 128, 0)'){
					memberSortUP();
				} else {
					memberSortDOWN();
				}
          		
           } else if (this.value == "Fee") {
				console.log("fee clicked");
				$(this).prop("checked", true).trigger("click");
				if ($(".Fee .up .fa-caret-up").css("color") === 'rgb(0, 128, 0)') {
					feeSortUP();
				} else {
					feeSortDOWN();
				}
			 
			 
           } else if (this.value == "GenderRatio") {
				console.log("genderRatio clicked");
				$(this).prop("checked", true).trigger("click");
				if ($(".Gender .up .fa-caret-up").css("color") === 'rgb(0, 128, 0)') {
					genderSortUP();
				} else {
					genderSortDOWN();
				}
           }
		});
    };

	

	$(document).ready(function(){
		
		applyFilter();
	
	});




	//Click on ADD 
	//







	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};






	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
			

			

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.

	function callDefault() {
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		//stickyFunction();
		owlCrouselFeatureSlide();
	};

	callDefault();

	readClubInfo(function() {
		
		callDefault();

		$("input[type=radio][name=opt][value=MemberCount]").prop("checked", true).trigger("click");

		var listElements = document.querySelectorAll(".single-club");
				
		var nodeArray = Array.prototype.slice.call(listElements, 0);

		var mapped = nodeArray.map(function(el, i) {
			return { index: i, value: el };
		});

		
		
		mapped.sort(function(a, b) {
			if (a.value.querySelector(".member-sort").innerText === b.value.querySelector('.member-sort').innerText)
				return 0;
			
			if (a.value.querySelector(".member-sort").innerText <= b.value.querySelector('.member-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		var changed_ind = mapped.map(function(el) {
			return el.index;
		});


		console.log(changed_ind);

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < mapped.length; i++){
			clubs.appendChild(mapped[i].value);
		};

		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").show();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").show();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
		
	});


}());