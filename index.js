const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Choice = require("inquirer/lib/objects/choice");

const writeFileAsync = util.promisify(fs.writeFile);



async function init() {

  try {
    const answers = await promptUser();

    const md = generateMD(answers);

    await writeFileAsync("README.md", md);

    console.log("Successfully wrote README.md file");
  } catch(err) {
    console.log(err);
  }
}

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of this project?"
    },
    {
      type: "input",
      name: "description",
      message: "Enter the description"
    },
    {
      type: "input",
      name: "installInstructions",
      message: "Enter the install instructions"
    },
    {
      type: "input",
      name: "usageInfo",
      message: "Enter usage information"
    },
    {
      type: "input",
      name: "contributionsGuidelines",
      message: "Enter contributions guidelines"
    },
    {
      type: "input",
      name: "testInstructions",
      message: "Enter test instructions"
    },
    {
      type: "list",
      name: "licenseChoice",
      message: "Choose the type of license",
      choices: ["Apache License 2.0", "BSD 3-Clause", "BSD 2-Clause", "MIT license"]
    },
    {
      type: "input",
      name: "contributionInstructions",
      message: "Enter contribution instructions",
    },
    {
      type: "input",
      name: "githubUsername",
      message: "Enter github user name",
    },
    {
      type: "input",
      name: "email",
      message: "Enter contact email",
    },
  ]);
}

function generateMD(answers) {
  return `
  ## ${answers.title}

    ${answers.description}


  ## Table of Contents


  ## Installation

    ${answers.installInstructions}

  ## Usage

  ${answers.usageInfo}

  ## License

  ${answers.licenseChoice}

  ## Contributing Guldlines

  ${answers.contributionInstructions}

  ## Test Instructions

  ${answers.installInstructions}

  ## Questions

  ${answers.githubUsername}
  ${answers.email}

  `;
}

init();
