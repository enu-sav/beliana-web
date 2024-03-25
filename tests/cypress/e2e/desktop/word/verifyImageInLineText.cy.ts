import {texts} from "../../../support/variables/textsForImageInLine";

/**
 * BEL-128 - 8. test case
 * - Navigate to /node/nid
 *
 * - Verify that an image is displayed after 64 characters
 * - Verify that the image is visible and has the correct src
 * - Verify that the text before the image is correct
 * - Verify that the text after the image is correct
 *
 */

describe('check if Image-in-text is loading', () => {
  before(() => {
    // exp. amidíny=13008
    const path = 'node/13008'

    cy.visit(path)
  })

  it('Verifying that an image is displayed after 64 characters', () => {
    cy.get('article.word-container .node__content')
      .should('be.visible')
      .within(() => {
        cy.get('p').then(($paragraph) => {
          const text = $paragraph.text();
          const index = text.indexOf(text.substring(64)); // 64 is the number of characters before the image
          const textBeforeImage = text.substring(0, index); // text before image
          const textAfterImage = text.substring(index); // text after image

          cy.step('image is visible and has correct src');
          cy.get('img')
            .should('be.visible')
            .and('have.attr', 'src')
            .and('include', 'amidiny.png');

          cy.log('textBeforeImage: ', textBeforeImage);
          expect(textBeforeImage).to.eq(texts.beforeImage);

          cy.log('textAfterImage: ', textAfterImage.substring(0, 42));
          expect(textAfterImage.substring(0, 42)).to.eq(texts.afterImage.substring(0, 42));
        });
      });
  })

})
