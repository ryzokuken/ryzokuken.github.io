$(document).ready(() => {
  const position = $('nav').offset();

  $(window).scroll(() =>  {
    if ($(window).scrollTop() > position.top) {
      $('#navigation').css({ 'position': 'fixed' });
      $('.brand').css({ 'opacity': '1' })
    } else {
      $('#navigation').css({ 'position': 'static' });
      $('.brand').css({ 'opacity': '0' })
    }
  });
});
