import * as fs from "fs";
import * as path from "path";
import { generateRootVars } from "./utils";

const GLOBALS_PATH = path.resolve(__dirname, "../src/app/globals.css");
const START_MARKER = "/* --- DESIGN TOKENS START --- */";
const END_MARKER = "/* --- DESIGN TOKENS END --- */";

function run() {
  const checkOnly = process.argv.includes("--check");
  const rootBlock = generateRootVars();
  const tokenBlock = `${START_MARKER}\n${rootBlock}\n${END_MARKER}`;

  let css = fs.readFileSync(GLOBALS_PATH, "utf-8");

  if (css.includes(START_MARKER) && css.includes(END_MARKER)) {
    const regex = new RegExp(
      `${escapeRegex(START_MARKER)}[\\s\\S]*?${escapeRegex(END_MARKER)}`
    );
    const current = css.match(regex)?.[0];

    if (current === tokenBlock) {
      console.log("✅ Design tokens are in sync.");
      process.exit(0);
    }

    if (checkOnly) {
      console.error("❌ Design tokens are out of sync. Run `npm run tokens` to fix.");
      process.exit(1);
    }

    css = css.replace(regex, tokenBlock);
  } else {
    if (checkOnly) {
      console.error("❌ No design token block found. Run `npm run tokens` to generate.");
      process.exit(1);
    }
    css = css + "\n\n" + tokenBlock + "\n";
  }

  fs.writeFileSync(GLOBALS_PATH, css, "utf-8");
  console.log("✅ Design tokens written to globals.css");
}

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

run();
