import { test as base } from "@playwright/test";

export type envConfig = {
  envName: string;
  appUrl: string;
  dbConfig: {};
};

export const test = base.extend<envConfig>({
  envName: ["test", { option: true }],
  appUrl: ["<provideUrl>", { option: true }],
  dbConfig: [{}, { option: true }],
});
