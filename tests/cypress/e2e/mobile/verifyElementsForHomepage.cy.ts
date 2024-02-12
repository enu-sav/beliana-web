import {texts} from '../../support/variables/textsForHomePage'

/**
 * BeforeEach tests (it block), disable scroll bar
 * AfterEach tests (it block), enabled scroll bar
 *
 * BEL-128 - 1. test case for viewport 390x844
 * - Navigate to homepage
 * - Verification of content, header, body, footer
 *  - check for pixel resolution
 *  - check (non)visible, (non)exist elements
 *  - check texts, lists and links
 */
describe('Mobile - check all elements and their dimensions in px for homepage', {
  viewportWidth: 390,
  viewportHeight: 844
}, () => {
  before(() => {
    cy.visit('/')
  })

  beforeEach(() => {
    cy.section('BeforeEach - hidden scrollbar')
    cy.changeValueForCssOverflow('html', 'hidden')
  })

  it('Content - verifying of visibility and px resolution of elements', () => {
    cy.checkElementWidth('body', 390)
    cy.get('.layout-container').should('be.visible')
  })

  it('Header - verifying of visibility and px resolution of elements', () => {
    cy.step('Verify header and children divs')
    cy.checkElementWidth('header', 390)
    cy.get('header')
      .should('be.visible')
      .within($header => {
        cy.wrap($header)
          .children('div')
          .should('be.visible')
          .and('have.length', 3)

        cy.section('Verify part header-top')
        cy.checkElementWidth('.header-top', 390)
        cy.get('.header-top')
          .should('be.visible')
          .within(() => {
            cy.step('Verify site name is visible')
            cy.get('.sitename').should('be.visible')

            cy.step('Verify non visible elements')
            cy.get('.left').should('not.be.visible')
            cy.get('.right').should('not.be.visible')
          })

        cy.section('Verify part header-main')
        cy.checkElementWidth('.header-main', 390)
        cy.get('.header-main')
          .should('be.visible')
          .within(() => {
            cy.step('Verify search box')
            cy.get('#block-bel-searchbox').should('be.visible')

            cy.step('Verify icon eye is visible')
            cy.get('.wcag-icons').should('be.visible')

            cy.step('Verify icon for smartphone-navigation is visible')
            cy.get('.smartphone-navigation i').should('be.visible')

            cy.step('Verify non visible elements')
            cy.get('.left').should('not.be.visible')
            cy.get('.right').should('not.be.visible')
          })

        cy.section('Verify part header-navigation')
        cy.checkElementWidth('.header-navigation', 390)
        cy.get('.header-navigation')
          .should('be.visible')
          .within(() => {
            cy.step('Verify if exist in DOM alphabetical-menu')
            cy.get('.word-facet-wrap').should('be.visible')
            cy.get('ul[id*=accessible-alphabetical-menu]').should('be.exist')
          })
      })
  })

  it('Body/Main - verifying of visibility and px resolution of elements', () => {
    cy.step('Verify body / content-main')
    cy.checkElementWidth('#content-main', 390)
    cy.get('#content-main .body-content')
      .should('be.visible')
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
              .and('have.text', `${texts.bodyLinkText}`)
              .find('a')
              .should('have.attr', 'href', 'node/28')
          })

        cy.section('Verify block anniversaries')
        cy.checkElementWidth('#block-views-block-today-block-anniversaries', 350)
        cy.get('#block-views-block-today-block-anniversaries')
          .should('be.visible')
          .within(() => {
            cy.step(`Verify text - ${texts.anniversaries}`)
            cy.contains('h2', `${texts.anniversaries}`).should('be.visible')

            cy.step(`Verify link - ${texts.linkForAnniversaries}`)
            cy.get('.more-link')
              .should('be.visible')
              .and('have.text', `${texts.linkForAnniversaries}`)

            cy.step('List of anniversaries')
            cy.get('ul li')
              .then($liElements => {
                if ($liElements.text().includes(`${texts.msgForEmptyAnniversariesList}`)) {
                  cy.step('List is empty')
                  cy.wrap($liElements).should('be.visible')
                } else {
                  cy.step('List is not empty - Verify list elements')
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
        cy.checkElementWidth('#block-views-block-content-recent-block-latest-words', 350)
        cy.get('#block-views-block-content-recent-block-latest-words')
          .should('be.visible')
          .within(() => {
            cy.step(`Verify text - ${texts.latestWords}`)
            cy.contains('h2', `${texts.latestWords}`).should('be.visible')

            cy.step('List of latest-words')
            cy.get('ul')
              .should('be.visible')
              .find('li')
              .should('have.length.greaterThan', 1)

            cy.step(`Verify link - ${texts.linkForLatestWords}`)
            cy.get('.more-link')
              .should('be.visible')
              .and('have.text', `${texts.linkForLatestWords}`)
          })

        cy.step('Verify non visible elements')
        cy.get('#block-bel-info-popup-block').should('not.be.visible')
        cy.get('#block-bel-content').should('not.be.visible')
      })
  })

  it('Footer - verifying of visibility and px resolution of elements', () => {
    cy.step('Verify footer and children divs')
    cy.checkElementWidth('footer', 390)
    cy.get('footer')
      .should('be.visible')
      .within($footer => {
        cy.wrap($footer)
          .children('div')
          .should('be.visible')
          .and('have.length', 2)

        cy.section('Verify part footer-content')
        cy.checkElementWidth('.footer-content', 390)
        cy.get('.footer-content')
          .should('be.visible')
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
        cy.checkElementWidth('.footer-bottom', 390)
        cy.get('.footer-bottom')
          .should('be.visible')
          .within(() => {
            cy.step('Verify copyright is visible')
            cy.get('.footer-copyright').should('be.visible')
          })
      })
  })

  afterEach(() => {
    cy.section('AfterEach - show scrollbar')
    cy.changeValueForCssOverflow('html', 'auto')
  })
})



