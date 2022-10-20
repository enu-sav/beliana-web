/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

  Drupal.behaviors.click_change_more_info = {
    attach: function (context, settings) {
      $(context).find('.more-info').once('structure-process').each(function () {
        $(this).on('click', 'h3', function (e) {
          if ($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
            $(this).parent().find('.detail').css('display', 'none');
            $(this).attr('aria-expanded', false);
            $(this).attr('aria-label', Drupal.t('aria-label-section-more-info-is-closed'));
          }
          else {
            $(this).parent().removeClass('open');
            $(this).parent().addClass('open');
            $(this).parent().find('.detail').css('display', 'block');
            $(this).attr('aria-expanded', true);
            $(this).attr('aria-label', Drupal.t('aria-label-section-more-info-is-open'));
          }
        });
      });
    }
  };

})(jQuery, Drupal);
