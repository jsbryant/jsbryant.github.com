// Reload to top of page 
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

// Sticky Header
	$('#header').stickThis();

// Big ups Chris Coyier https://css-tricks.com/snippets/jquery/smooth-scrolling/
	$('a[href*="#"]')
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	      && 
	      location.hostname == this.hostname
	    ) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      if (target.length) {
		event.preventDefault();
		$('html, body').animate({
		  scrollTop: target.offset().top
		}, 1000, function() {
		  var $target = $(target);
		  $target.focus();
		  if ($target.is(":focus")) {
		    return false;
		  } else {
		    $target.attr('tabindex','-1');
		    $target.focus();
		  };
		});
	      }
	    }
	  });
