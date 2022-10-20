/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

  Drupal.behaviors.click_change_node_word_citation = {
    attach: function (context, settings) {
      $(context).find('article > .word').once('structure-process').each(function () {
        var $word = $(this);
        $word.on('click', '.citation h3', function (e) {
          if ($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
            $(this).parent().find('#dialog-desc').css('display', 'none');
            $(this).attr('aria-expanded', false);
            $(this).attr('aria-label', Drupal.t('aria-label-section-citation-is-closed'));
          }
          else {
            $(this).parent().removeClass('open');
            $(this).parent().addClass('open');
            $(this).parent().find('#dialog-desc').css('display', 'block');
            $(this).attr('aria-expanded', true);
            $(this).attr('aria-label', Drupal.t('aria-label-section-citation-is-open'));
          }
        });
      });
    }
  };

})(jQuery, Drupal);
