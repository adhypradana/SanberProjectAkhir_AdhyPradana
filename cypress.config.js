const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    fixturesFolder: "cypress/fixtures",
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {},
  },
});