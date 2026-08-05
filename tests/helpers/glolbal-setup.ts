import { chromium, type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
  // delete allure - results
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log("global setup is running");
    const resultDir = path.resolve(process.cwd(), "allure-results");
    if (fs.existsSync(resultDir)) {
      fs.rmSync(resultDir, { recursive: true, force: true });
    }
  }
}
