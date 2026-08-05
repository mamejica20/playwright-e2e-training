import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { error } from "console";
import { log } from "../helpers/logger";

/**
 *
 * @param filepath
 * @returns
 */
function readCSVFile(filepath: string): any[] {
  const csvDataStr = fs.readFileSync(filepath, { encoding: "utf-8" });
  const csvArray = parse(csvDataStr, {
    columns: true,
    trim: true,
  });

  return csvArray;
}
/**
 *
 * @param filepath
 * @returns
 */
function readFile(filepath: string) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`No File exisit with given name ${filepath}`);
  }
  let data = fs.readFileSync(filepath, "utf-8");
  return data;
}
function writeFile(filepath: string, data: string) {
  // JSON.stringfy(JSON, undefined, 4) this format is to save json file into a clean way
  try {
    fs.writeFileSync(filepath, data);
    log("info", `Writing file: ${filepath}`);
  } catch (error) {}
}

export default { readCSVFile, readFile, writeFile };
