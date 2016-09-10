//= require ./vendor/bootstrap-sprockets.js
//= require ./vendor/jasny-bootstrap.min.js

jQuery(window).ready(function($){
  $('.to-the-top').click(function(){
    $('body, html').animate({scrollTop: 0});
  })
});
