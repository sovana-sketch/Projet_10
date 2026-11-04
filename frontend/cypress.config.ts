import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});


