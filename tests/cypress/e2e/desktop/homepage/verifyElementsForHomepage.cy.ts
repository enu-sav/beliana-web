import {texts} from '../../../support/variables/textsForHomePage'
import {resolutions} from '../../../support/variables/viewportResolutions'

/**
 * BeforeEach tests (it block), disable scroll bar
 * AfterEach tests (it block), enabled scroll bar
 *
 * BEL-128 - 1. test case for desktop viewport
 * - Navigate to homepage
 * - Verification of content, header, body, footer
 *  - check for pixel resolution
 *  - check (non)visible, (non)exist elements
 *  - check texts, lists and links
 */
describe('Desktop - check all elements and their dimensions in px for homepage', () => {
  before(() => {
    cy.visit('/')
  })

  beforeEach(() => {
    cy.step('BeforeEach - hidden scrollbar')
    cy.changeValueForCssOverflow('html', 'hidden')
  })

  it('Content - Verifying of visibility and px resolution of elements', () => {
    cy.get('.layout-container').should('be.visible')
    cy.get('body').checkElementWidth(resolutions.desktop.viewportWidth)
  })

  it('Header - Verifying of visibility and px resolution of elements', () => {
    cy.step('Verify header and children divs')
    cy.get('header')
      .should('be.visible')
      .checkElementWidth(resolutions.desktop.viewportWidth)
      .within($header => {

        cy.wrap($header)
          .children('div')
          .should('be.visible')
          .and('have.length', 3)

        cy.section('Verify part header-top')
        cy.get('.header-top')
          .should('be.visible')
          .checkElementWidth(resolutions.desktop.viewportWidth)
          .within(() => {
            cy.step(`Verify text/attribute in header - ${texts.aboutBeliane}`)
            cy.get('.left')
              .should('be.visible')
              .within(() => {
                cy.contains('li a', texts.aboutBeliane)
                  .should('be.visible')
                  .and('have.attr', 'data-drupal-link-system-path', 'node/28')
              })

            cy.step('Verify text/href in header for links')
            cy.get('.right')
              .should('be.visible')
              .within(() => {
                cy.get('#block-bel-links a')
                  .then($links => {
                    cy.wrap($links)
                      .should('be.visible')
                      .and('have.length', 2)
                      .each(($el, index) => {
                        expect($el).to.have.attr('href')
                        expect($el).to.have.text(texts.headerTopTexts[index])
                      })
                  })

                cy.step('Verify icon eye is visible')
                cy.get('.wcag-icons').should('be.visible')
              })

            cy.step('Verify non visible elements')
            cy.get('.sitename').should('not.be.visible')
            cy.get('#block-bel-mobile-menu').should('not.be.visible')
          })

        cy.section('Verify part header-main')
        cy.get('.header-main')
          .should('be.visible')
          .checkElementWidth(resolutions.desktop.viewportWidth)
          .within(() => {
            cy.step('Verify search box')
            cy.get('#block-bel-searchbox').should('be.visible')

            cy.step('Verify text in header for search option')
            cy.get('.right')
              .should('be.visible')
              .within(() => {
                cy.get('.search-help a')
                  .should('be.visible')
                  .and('contain.text', texts.searchOptions)
                cy.step('Verify aria-label attribute in search option')
                cy.get('.search-help a')
                  .should('have.attr', 'aria-label', texts.searchOptionsAriaLabelClosed)
                  .sample().click()
                  .should('have.attr', 'aria-label', texts.searchOptionsAriaLabelOpen)
                  .should('have.attr', 'aria-expanded', 'true')
                  .sample().click()
                  .should('have.attr', 'aria-label', texts.searchOptionsAriaLabelClosed)
                  .should('have.attr', 'aria-expanded', 'false')
              })

            cy.step('Verify non visible elements')
            cy.get('.left').should('not.be.visible')
            cy.get('.wcag-icons').should('not.be.visible')
            cy.get('.smartphone-navigation i').should('not.be.visible')
          })

        cy.section('Verify part header-navigation')
        cy.get('.header-navigation')
          .should('be.visible')
          .checkElementWidth(resolutions.desktop.viewportWidth)
          .within(() => {
            cy.step('Verify if exist in DOM alphabetical-menu')
            cy.get('.word-facet-wrap').should('be.visible')

            cy.get('ul[id*=accessible-alphabetical-menu]')
              .children()
              .should('be.exist')
              .and('be.visible')
              .and('have.length.greaterThan', 10)
          })
      })
  })

  it('Body/Main - Verifying of visibility and px resolution of elements', () => {
    cy.step('Verify body / content-main')
    cy.get('#content-main .body-content')
      .should('be.visible')
      .checkElementWidth(resolutions.desktop.viewportWidth)
      .within(() => {

        cy.section('Verify block encyklopedia')
        cy.get('#block-bel-encyklopedia')
          .should('be.visible')
          .within(() => {
            cy.step('Verify img is visible')
            cy.get('img').should('be.visible')

            cy.step('Verify text/link in body under img')
            cy.get('.field p')
              .should('be.visible')
              .and('have.text', texts.bodyLinkText)
              .find('a')
              .should('have.attr', 'href', 'node/28')
          })

        cy.section('Verify block anniversaries')
        cy.get('#block-views-block-today-block-anniversaries')
          .should('be.visible')
          .checkElementWidth(396)
          .within(() => {
            cy.step(`Verify text - ${texts.anniversaries}`)
            cy.contains('h2', texts.anniversaries).should('be.visible')

            cy.step(`Verify link - ${texts.linkForAnniversaries}`)
            cy.get('.more-link')
              .should('be.visible')
              .and('have.text', texts.linkForAnniversaries)

            cy.step('List of anniversaries')
            cy.get('ul li')
              .then($liElements => {
                if ($liElements.text().includes(texts.msgForEmptyAnniversariesList)) {
                  cy.wrap($liElements).should('be.visible')
                } else {
                  cy.wrap($liElements)
                    .should('be.visible')
                    .and('have.length.greaterThan', 1)
                    .find('a')
                    .each($el => {
                      expect($el).to.have.attr('href')
                    })
                }
              })
          })

        cy.section('Verify block latest-words')
        cy.get('#block-views-block-content-recent-block-latest-words')
          .should('be.visible')
          .checkElementWidth(1130)
          .within(() => {
            cy.step(`Verify text - ${texts.latestWords}`)
            cy.contains('h2', texts.latestWords).should('be.visible')

            cy.step('List of latest-words')
            cy.get('ul')
              .should('be.visible')
              .find('li')
              .should('have.length.greaterThan', 1)

            cy.step(`Verify link - ${texts.linkForLatestWords}`)
            cy.get('.more-link')
              .should('be.visible')
              .and('have.text', texts.linkForLatestWords)
          })

        cy.step('Verify non visible elements')
        cy.get('#block-bel-info-popup-block').should('not.be.visible')
        cy.get('#block-bel-content').should('not.be.visible')
      })
  })

  it('Footer - verifying of visibility and px resolution of elements', () => {
    cy.step('Verify footer and children divs')
    cy.get('footer')
      .should('be.visible')
      .checkElementWidth(resolutions.desktop.viewportWidth)
      .within($footer => {
        cy.wrap($footer)
          .children('div')
          .should('be.visible')
          .and('have.length', 2)

        cy.section('Verify part footer-content')
        cy.get('.footer-content')
          .should('be.visible')
          .checkElementWidth(resolutions.desktop.viewportWidth)
          .within(() => {
            cy.step('Verify list for links')
            cy.get('#block-bel-footer')
              .should('be.visible')
              .find('ul')
              .should('be.visible')
              .then($ul => {
                cy.step('Verify text and href for li elements in list')
                cy.wrap($ul)
                  .find('li')
                  .should('be.visible')
                  .and('have.length', 5)
                  .each(($liElements, index) => {
                    cy.wrap($liElements)
                      .invoke('text')
                      .then(text => {
                        expect(text.trim()).to.be.equal(texts.footerLinksText[index]);
                      })

                    cy.wrap($liElements).find('a').should('be.exist')
                  })
              })

            cy.step('Verify non visible elements')
            cy.get('#block-bel-footer-menu').should('not.be.visible')
          })

        cy.section('Verify part footer-bottom')
        cy.get('.footer-bottom')
          .should('be.visible')
          .checkElementWidth(resolutions.desktop.viewportWidth)
          .within(() => {
            cy.step('Verify copyright is visible')
            cy.get('.footer-copyright').should('be.visible')
          })
      })
  })

  afterEach(() => {
    cy.step('AfterEach - show scrollbar')
    cy.changeValueForCssOverflow('html', 'auto')
  })
})
