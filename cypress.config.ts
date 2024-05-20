import { defineConfig } from "cypress";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env = {
        ...config.env,
        ...process.env,
      };
      return config;
    },
    baseUrl: "http://localhost:3000",
    watchForFileChanges: false,
    experimentalModifyObstructiveThirdPartyCode: true,
  },
});
