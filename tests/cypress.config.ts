import {defineConfig} from 'cypress'
import * as fs from 'fs'

export default defineConfig({
  viewportWidth: 1536,
  viewportHeight: 864,
  chromeWebSecurity: false,

  e2e: {
    supportFile: './cypress/support/e2e.ts',
    testIsolation: false,

    setupNodeEvents(on, config) {
      // delete the video if the spec passed
      on('after:spec', (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
        if (results && results.video && results.stats.failures === 0) {
          fs.unlinkSync(results.video)
        }
      })
    }
  }
})
