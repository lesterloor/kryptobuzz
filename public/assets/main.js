$( document ).ready(function() {

  // Toggle button for editing editForm
  $( ".rightSpan .editBTN" ).click(function(e) {
    e.preventDefault();
    $( ".editInput" ).toggle();
    $( ".rightSpan" ).toggle();
    $( ".profileSubmitBtn" ).toggle();
  });
  // $( ".editBTN" ).click(function(e) {
  //   e.preventDefault();
  //   $('.editInput').css('display','')
  //   $('.rightSpan').css('display','none')
  //   console.log( "Handler for .click() called." );
  // });

  //
  console.log( "ready!" );
$.stellar({
  horizontalScrolling: false
});

// Menu hightlighting
$(window).scroll(function() {
  $(".navigation").css("top", $(window).scrollTop());

  var position = $(this).scrollTop();

  $(".section").each(function() {
    var target = $(this).offset().top - $(window).height() / 2;
    var id = $(this).attr("id");

    if (position >= target) {
      $(".menu-item").removeClass("selected");
      $('.menu-item[href="#' + id + '"]').addClass("selected");
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      $(".menu-item").removeClass("selected");
      $('.menu-item[href="#contact"]').addClass("selected");
    }
  });
});

// Smooth scrolling
$('a[href^="#"]').click(function(event) {
  event.preventDefault();
  var e = $(this).attr("href");
  return $("html, body").animate(
    {
      scrollTop: $(e).offset().top
    },
    1000
  );
});
});
