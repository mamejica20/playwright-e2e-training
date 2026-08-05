import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config";
import { envConfig } from "../tests/helpers/config-fixtures";
import path from "node:path";

export default defineConfig<envConfig>({
  ...baseConfig, // loads all existing config under playwright.config.ts / config values
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use, //loading the existing use object
    envName: "test",
    appUrl: "https://youtube.com/",
  },
});
