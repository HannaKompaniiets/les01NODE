const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator.js");
const checkExtenstion = require("./helpers/checkExtention.js");

async function createFile(fileName, content) {
  const file = {
    fileName,
    content,
  };
  const validatedData = dataValidator(file);

  if (validatedData.error) {
    console.log(
      chalk.red(
        `Please specify ${validatedData.error.details[0].path} parametr`
      )
    );
    return;
  }

  console.log(checkExtenstion(fileName));
  if (!checkExtenstion(fileName).isPresent) {
    console.log(
      chalk.red(
        `Sorry this application does not support ${
          checkExtenstion(fileName).extention
        } extention`
      )
    );
    return;
  }

  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green(`File was created saccessfully`));
  } catch (error) {
    console.log(error);
  }
}

async function getFiles() {
  const folderPath = path.join(__dirname, "files");
  const dataPath = await fs.readdir(folderPath);

  if (!dataPath.length) {
    console.log(chalk.red("No file is this folder"));
    return;
  }
  console.log(dataPath);
}

async function getInfo(fileName) {
  const folderPath = path.join(__dirname, "files");
  const folderData = await fs.readdir(folderPath);

  if (!folderData.includes(fileName)) {
    console.log(chalk.red("no file with this name"));
    return;
  }

  const filePath = path.join(__dirname, "files", fileName);

  const fileContent = await fs.readFile(filePath, "utf-8");
  const ext = path.extname(fileName);
  const fixedExt = ext.slice(1);
  const name = path.basename(fileName, `${ext}`);

  console.log({ name, fixedExt, fileContent });
 }

module.exports = {
  createFile,
  getFiles,
  getInfo,
};
