<!-- Reload to top of page -->
	<script type="text/javascript">
		window.onbeforeunload = function () {
		  window.scrollTo(0, 0);
		}
	</script>

	<!-- Sticky Header -->
	<script type="text/javascript">
		$('#header').stickThis();
	</script>

	<!-- Big ups Chris Coyier https://css-tricks.com/snippets/jquery/smooth-scrolling/ -->
	<script type="text/javascript">
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
	</script>
