// end of execution it will clear all data or need to close connections
import { chromium, type FullConfig } from "@playwright/test";
import path from "path";
import { exec } from "child_process";
import fs from "fs";
import { stdout } from "process";

export default async function globalTeardown(config: FullConfig) {
  // delete allure - results
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log("global teardown is running");
    exec("allure serve", (error, stdout, stderr) => {
      if (error) {
        console.error("ERROR: Starting Allure Error", error.message);
      }
    });
  }
  console.log("[INFO]: Completed the global teardown process");
}
