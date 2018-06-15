

$(function() {

  function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
          height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
          }

          return height;
        }

        $(window).scroll(function () {
          var vpH = getViewportHeight(),
          scrolltop = (document.documentElement.scrollTop ?
            document.documentElement.scrollTop :
            document.body.scrollTop),
          elems = [];

        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
          if (this.events && this.events.inview) {
            elems.push(this.handle.elem);
          }
        });

        if (elems.length) {
          $(elems).each(function () {
            var $el = $(this),
            top = $el.offset().top,
            height = $el.height(),
            inview = $el.data('inview') || false;

            if (scrolltop > (top + height) || scrolltop + vpH < top) {
              if (inview) {
                $el.data('inview', false);
                $el.trigger('inview', [ false ]);
              }
            } else if (scrolltop < (top + height)) {
              if (!inview) {
                $el.data('inview', true);
                $el.trigger('inview', [ true ]);
              }
            }
          });
        }
      });

    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
      $(window).scroll();
    });


    $("#portfolio_grid").mixItUp({
      callbacks: {
        onMixLoad: function() {

        },
        onMixStart: function() {
          $('div.toggleDiv').hide();
        },
        onMixEnd: function() {

        }
      }
    });

    function heightDetect() {
		$('.main_head').css('height', $(window).height()); //высота блока на всю высоту экрана
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

  $('.zoom-popup').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true
    },
    gallery: {
      enabled: false
    },
    zoom: {
      enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
              return element.find('img');
            }
          }

        });



	//Get width of container
	var containerWidth = $('.container').width();
	//Resize animated triangle
	$(".triangle").css({
		"border-left": containerWidth / 2 + 'px outset transparent',
		"border-right": containerWidth / 2 + 'px outset transparent'
	});
	$(window).resize(function () {
		containerWidth = $('.container').width();
		$(".triangle").css({
			"border-left": containerWidth / 2 + 'px outset transparent',
			"border-right": containerWidth / 2 + 'px outset transparent'
		});
	});

// 	//Animate triangles
// $('.triangle').animated("fadeInDown","fadeOutDown");

//Preloader fadeout and delay
$(".loader_inner").fadeOut();
$(".loader").delay(400).fadeOut("slow");

$(".name_text h1").animated("fadeInDown", "fadeOutUp");
$(".name_text p, .top_text").delay(400).animated("fadeInUp", "fadeOutDown");
$(".animation_1").animated("flipInY", "fadeOutDown");
$(".animation_2").animated("fadeInLeft", "fadeOutDown");
$(".animation_3").animated("fadeInRight", "fadeOutDown");



jQuery(document).ready(function ($) {
  var lastId,
  topMenu = $("#top-navigation"),
  topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
        	var href = $(this).attr("href");
        	if(href.indexOf("#") === 0){
        		var item = $($(this).attr("href"));
        		if (item.length) {
        			return item;
        		}
        	}
        });

        $(window).scroll(function () {

        //Display or hide scroll to top button
        if ($(this).scrollTop() > 100) {
          $('.scrollup').fadeIn();
        } else {
          $('.scrollup').fadeOut();
        }



        if ($(this).scrollTop() > $(window).height()-71) {
					$('.navbar').addClass('navbar-fixed-top animated fadeInDown').css('background','rgba(24,26,28,1)');
					$('#play-link').show();

        } else {
					$('.navbar').removeClass('navbar-fixed-top animated fadeInDown').css('background','rgba(24,26,28,.3)');
					$('#play-link').hide();

        }

        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 10;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
        	if ($(this).offset().top < fromTop)
        		return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
        	lastId = id;
            // Set/remove active class
            menuItems
            .parent().removeClass("active")
            .end().filter("[href=#" + id + "]").parent().addClass("active");
          }
        });
      });


    //Function for show or hide portfolio desctiption.
    $.fn.showHide = function (options) {
      var defaults = {
        speed: 1000,
        easing: '',
        changeText: 0,
        showText: 'Show',
        hideText: 'Hide'
      };
      var options = $.extend(defaults, options);
      $(this).click(function () {
        $('.toggleDiv').slideUp(options.speed, options.easing);
        var toggleClick = $(this);
        var toggleDiv = $(this).attr('rel');
        $(toggleDiv).slideToggle(options.speed, options.easing, function () {
          if (options.changeText == 1) {
            $(toggleDiv).is(":visible") ? toggleClick.text(options.hideText) : toggleClick.text(options.showText);
          }
        });
        return false;
      });
    };

    //Initial Show/Hide portfolio element.
    $('div.toggleDiv').hide();
    $('.show_hide').showHide({
      speed: 500,
      changeText: 0,
      showText: 'View',
      hideText: 'Close'
    });

    //Animate contact form
    jQuery('.main_form').bind('inview', function (event, visible) {
      if (visible == true) {
        jQuery('.main_form').addClass("animated bounceIn");
      } else {
        jQuery('.main_form').removeClass("animated bounceIn");
      }
    });


    $("a.show_hide").click(function () {
      var elementClick = $(this).attr("href");
      var destination = $(elementClick).offset().top;
      $('html,body').animate( { scrollTop: destination }, 500 );
      return false;
    });



    $(".navbar li a, a.show_hide, .scrollup a").mPageScroll2id();

    $(".toggle_mnu").click(function() {
     $(".grid_button").toggleClass("closed");
   });

    $(".top_mnu ul a").click(function() {
     $(".top_mnu").fadeOut(400);
     $(".grid_button").removeClass("closed");
   });

    $(".toggle_mnu, .top_mnu ul a").click(function() {
     if ($(".top_mnu").is(":visible")) {
      $(".name_text, .scene").css("opacity", "1");
      $(".top_mnu").fadeOut(100);
      $(".top_mnu li").removeClass("fadeInUp animated");
    } else {
      $(".name_text, .scene").css("opacity", ".1");
      $(".top_mnu").fadeIn(300);
      $(".top_mnu li").addClass("fadeInUp animated");
    };
  });

    $(".animation_1").animated("flipInY", "fadeOutDown");
    $(".left .resume_item").animated("fadeInLeft", "fadeOutDown");
    $(".right .resume_item").animated("fadeInRight", "fadeOutDown");

    $(".portfolio li").click(function() {
     $(".portfolio li").removeClass("active");
     $(this).addClass("active");
   })

    /* Share button canvas*/
    var $shareButtons=$(".share-button")
    ,$toggleButton=$(".share-toggle-button")

    ,menuOpen=false
    ,buttonsNum=$shareButtons.length
    ,buttonsMid=(buttonsNum/2)
    ,spacing=75
    ;

    function openShareMenu(){
     TweenMax.to($toggleButton,0.1,{
      scaleX:1.2,
      scaleY:0.6,
      ease:Quad.easeOut,
      onComplete:function(){
       TweenMax.to($toggleButton,.8,{
        scale:0.6,
        ease:Elastic.easeOut,
        easeParams:[1.1,0.6]
      })
       TweenMax.to($toggleButton.children(".share-icon"),.8,{
        scale:1.4,
        ease:Elastic.easeOut,
        easeParams:[1.1,0.6]
      })
     }
   })
     $shareButtons.each(function(i){
      var $cur=$(this);
      var pos=i-buttonsMid;
      if(pos>=0) pos+=1;
      var dist=Math.abs(pos);
      $cur.css({
       zIndex:buttonsMid-dist
     });
      TweenMax.to($cur,1.1*(dist),{
       x:pos*spacing,
       scaleY:0.6,
       scaleX:1.1,
       ease:Elastic.easeOut,
       easeParams:[1.01,0.5]
     });
      TweenMax.to($cur,.8,{
       delay:(0.2*(dist))-0.1,
       scale:0.6,
       ease:Elastic.easeOut,
       easeParams:[1.1,0.6]
     })

      TweenMax.fromTo($cur.children(".share-icon"),0.2,{
       scale:0
     },{
       delay:(0.2*dist)-0.1,
       scale:1,
       ease:Quad.easeInOut
     })
    })
   }
   function closeShareMenu(){
     TweenMax.to([$toggleButton,$toggleButton.children(".share-icon")],1.4,{
      delay:0.1,
      scale:1,
      ease:Elastic.easeOut,
      easeParams:[1.1,0.3]
    });
     $shareButtons.each(function(i){
      var $cur=$(this);
      var pos=i-buttonsMid;
      if(pos>=0) pos+=1;
      var dist=Math.abs(pos);
      $cur.css({
       zIndex:dist
     });

      TweenMax.to($cur,0.4+((buttonsMid-dist)*0.1),{
       x:0,
       scale:.95,
       ease:Quad.easeInOut,
     });

      TweenMax.to($cur.children(".share-icon"),0.2,{
       scale:0,
       ease:Quad.easeIn
     });
    })
   }

   function toggleShareMenu(){
     menuOpen=!menuOpen

     menuOpen?openShareMenu():closeShareMenu();
   }
   $toggleButton.on("mousedown",function(){
     toggleShareMenu();
   })


   $.fn.equalHeights = function() {
     var maxHeight = 0,
     $this = $(this);

     $this.each( function() {
      var height = $(this).innerHeight();

      if ( height > maxHeight ) { maxHeight = height; }
    });

     return $this.css('height', maxHeight);
   };

    // auto-initialize plugin
    $('[data-equal]').each(function(){
    	var $this = $(this),
    	target = $this.data('equal');
    	$this.find(target).equalHeights();
    });

    $('.item_l, .item_r').equalHeights();



	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};


    //Function for show or hide portfolio desctiption.
    $("#send-mail").click(function () {

        var name = $('input#name').val(); // get the value of the input field
        var error = false;
        if (name == "" || name == " ") {
          $('#err-name').show(500);
          $('#err-name').delay(4000);
          $('#err-name').animate({
            height: 'toggle'
          }, 500, function () {
                // Animation complete.
              });
            error = true; // change the error state to true
          }

        var emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
        var email = $('input#email').val().toLowerCase(); // get the value of the input field
        if (email == "" || email == " " || !emailCompare.test(email)) {
          $('#err-email').show(500);
          $('#err-email').delay(4000);
          $('#err-email').animate({
            height: 'toggle'
          }, 500, function () {
                // Animation complete.
              });
            error = true; // change the error state to true
          }


        var comment = $('textarea#comment').val(); // get the value of the input field
        if (comment == "" || comment == " ") {
          $('#err-comment').show(500);
          $('#err-comment').delay(4000);
          $('#err-comment').animate({
            height: 'toggle'
          }, 500, function () {
                // Animation complete.
              });
            error = true; // change the error state to true
          }

          if (error == false) {
            var dataString = $('#contact-form').serialize(); // Collect data from form
            $.ajax({
              type: "POST",
              url: $('#contact-form').attr('action'),
              data: dataString,
              timeout: 6000,
              error: function (request, error) {

              },
              success: function (response) {
                response = $.parseJSON(response);
                if (response.success) {
                  $('#successSend').show();
                  $("#name").val('');
                  $("#email").val('');
                  $("#comment").val('');
                } else {
                  $('#errorSend').show();
                }
              }
            });
            return false;
          }

        return false; // stops user browser being directed to the php file
      });


	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});

(jQuery);

