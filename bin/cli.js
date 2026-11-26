#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const os = require("os");

const skillsDir = path.resolve(__dirname, "..", "skills");
const availableSkills = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const usage = () => {
  console.log("Usage:");
  console.log("  npx marketing-master-skill init [skill...] [--global]");
  console.log("  npx marketing-master-skill list");
  console.log("");
  console.log(`Skills: ${availableSkills.join(", ")}`);
  console.log("Running init with no skill names installs every skill.");
};

const argv = process.argv.slice(2);
const command = argv[0] && !argv[0].startsWith("-") ? argv[0] : "init";
const flags = command === "init" && argv[0] === "init" ? argv.slice(1) : argv;

if (command === "list") {
  for (const name of availableSkills) {
    console.log(name);
  }
  process.exit(0);
}

if (command !== "init") {
  usage();
  process.exit(1);
}

const isGlobal = flags.includes("--global") || flags.includes("-g");
const requested = flags.filter((flag) => !flag.startsWith("-"));
const unknown = requested.filter((name) => !availableSkills.includes(name));

if (unknown.length > 0) {
  console.error(`Unknown skill: ${unknown.join(", ")}`);
  usage();
  process.exit(1);
}

const selected = requested.length > 0 ? requested : availableSkills;
const targetBase = isGlobal
  ? path.join(os.homedir(), ".claude", "skills")
  : path.join(process.cwd(), ".claude", "skills");

for (const name of selected) {
  const target = path.join(targetBase, name);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(path.join(skillsDir, name), target, { recursive: true });
  console.log(`Installed ${name} -> ${target}`);
}

const nextSteps = ["Open Claude Code in your project."];
if (selected.includes("marketing-master")) {
  nextSteps.push('Run: "Use marketing-master to run the full pipeline for this product"');
}
if (selected.includes("natural-food-photographer")) {
  nextSteps.push('Run: "Use natural-food-photographer for a GoFood menu photo of nasi goreng"');
}

console.log("\nNext steps:");
nextSteps.forEach((step, index) => console.log(`${index + 1}. ${step}`));
