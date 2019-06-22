import { exec } from "shelljs";
// import { stringLiteral } from "@babel/types";

export function build() {
  const shellString = exec("npx stencil build");
  // console.log(JSON.stringify(shellString));
  // console.log(`shellString\n${shellString.toString()}`);
  const buildSucceed = !shellString.stdout.includes("build failed"); 
  return buildSucceed;
}