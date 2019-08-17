import { echo, cd } from "shelljs";
import * as stenciljs from "./libraries/stenciljsCommands";
import *  as packageJson from "./libraries/packageJson";
import * as codeFiles from "./libraries/updateFiles";

import * as firebase from "./libraries/firebase";

echo("****************************************");
echo(" current command working directory      ");
echo("****************************************");
echo(process.cwd());

echo("****************************************");
echo(" increment patch version                ");
echo("****************************************");
packageJson.IncrementPatchVersion_WithNoCitTag();

const version = packageJson.version();
const splashScreen = "./src/pages/sudoku-home/sudoku-home.tsx";
echo("****************************************");
echo(`replace version:${version} in file:${splashScreen}`);
echo("****************************************");
codeFiles.replaceBuildNumberInHomePageFromVersion(version, splashScreen);

if (stenciljs.build()) {
  console.log("+++ BUILD SUCCEEDED +++ !!");
  firebase.deploy();
} else {
  console.log("--- BUILD FAILED --- !!");
}
