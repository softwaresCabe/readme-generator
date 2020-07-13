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
      choices: ["Apache License 2.0", "BSD 2-Clause", "BSD 3-Clause", "MIT license"]
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

generateMD = answers => {
  var badge = assignBadge(answers.licenseChoice);
  return `
  ## ${answers.title}
  ${badge}

  ${answers.description}

  ## Table of Contents

  1. [Installation](#Installation)
  2. [Usage](#Usage)
  3. [License](#Liscense)
  4. [Contributing Guldlines](#Contributing-Guldlines)
  5. [Test Instructions](#Test-Instructions)
  6. [Questions](#Questions)


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
  
  [GitHub](https://github.com/${answers.githubUsername})
  ${answers.email}

  `;
}


assignBadge = choice => {

  if(choice === "Apache License 2.0"){
    return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  }
  else if (choice === "BSD 3-Clause"){
    return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
  }
  else if (choice === "BSD 2-Clause"){
    return "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
  }
  else {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  }

}

init();
