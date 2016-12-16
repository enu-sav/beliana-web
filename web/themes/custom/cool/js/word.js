(function ($) {
/*
	Drupal.behaviors.selectric = {
		attach: function(context, settings) {
			$('select').selectric();
		}
	}

	Drupal.behaviors.shareSelect = {
		attach: function(context, settings) {
			$('.selectric-wrapper').click(function() {
				$(this).toggleClass("selectric-open");
				var width = $(this).width();
				$(this).find(".selectric-items").css("width", width);
			});
		}
	}

	Drupal.behaviors.fbShare = {
		attach: function(context, settings) {
			$.ajaxSetup({ cache: true });
  			$.getScript('//connect.facebook.net/en_US/sdk.js', function() {
  				FB.init({
			      appId: '1810364362554928',
			      xfbml: true,
			      version: 'v2.8' // or v2.1, v2.2, v2.3, ...
			    });
			});
			$(".share-facebook").click(function() {
				var href = window.location.href;
				FB.ui({
				  method: 'share',
				  href: href,
				}, function(response){});
			});
		}
	}

	Drupal.behaviors.twitterShare = {
		attach: function(context, settings) {
			$('.share-twitter').click(function(event) {
			    var width  = 575,
			        height = 400,
			        left   = ($(window).width()  - width)  / 2,
			        top    = ($(window).height() - height) / 2,
			        url    = "https://twitter.com/intent/tweet?text=Ramadán",
			        opts   = 'status=1' +
			                 ',width='  + width  +
			                 ',height=' + height +
			                 ',top='    + top    +
			                 ',left='   + left;
			    
			    window.open(url, 'twitter', opts);
			  });
		}
	}
*/
})(jQuery);