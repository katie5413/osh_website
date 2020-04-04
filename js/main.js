(function($) {
  "use strict"; // Start of use strict
  //smooth scroll
  $("a").click(function() {
    $("html,body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 110
      },
      500
    );

    return false;
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 71
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };

  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Activate scrollspy to add active class to page-section-heading on scroll
  $(window).scroll(function(event) {
    var scroll = $(window).scrollTop();

    // Do something
    if (scroll == 0) {
      $("#main").addClass("w3-animate-bottom");
    } else {
      $("#main").removeClass("w3-animate-bottom");
    }
    if (scroll > 270) {
      $("#about").addClass("w3-animate-left");
    } else {
      $("#about").removeClass("w3-animate-left");
    }

    if (scroll > 160) {
      $("#current").addClass("w3-animate-left");
    } else {
      $("#current").removeClass("w3-animate-left");
    }
    if (scroll > 795) {
      $("#previous").addClass("w3-animate-bottom");
    } else {
      $("#previous").removeClass("w3-animate-bottom");
    }
  });

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  //
})(jQuery); // End of use strict
