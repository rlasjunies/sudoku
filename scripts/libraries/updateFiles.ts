
import { sed } from "shelljs";

export function replaceVersionInCode(version: string, file: string) {
  sed("-i", /(\d+).(\d+).(\d+)/, version, file);
}

export function replaceBuildNumberInHomePageFromVersion(version: string, file: string) {
  
  // retrieve the build number
  const buildRegExp =  /(\d+).(\d+).(\d+)/g;
  const versionParsed = buildRegExp.exec(version);
  const buildNumber = versionParsed[3];

  // create the new line with the new build number 
  const newLine = `@State\(\) version = "${buildNumber}"; //version to be updated`;
  
  // prepare the search 
  
  // const searchLineregExpr = new RegExp('@State\(\) version = "(\d+)"; //version to be updated');
  const searchLineregExpr = /@State\(\) version = "(\d+)"; \/\/version to be updated/g;
  const result = sed("-i", searchLineregExpr, newLine, file);

}

export function replaceBuildNumberInGlobal(version: string, file: string) {
  
  // retrieve the build number
  const buildRegExp =  /(\d+).(\d+).(\d+)/g;
  const versionParsed = buildRegExp.exec(version);
  const buildNumber = versionParsed[3];

  // create the new line with the new build number 
  // const newLine = `@State\(\) version = "${buildNumber}"; //version to be updated`;
  const newLine = `export const version = ${buildNumber}; // version to replaced`
  // prepare the search 
  
  // const searchLineregExpr = new RegExp('@State\(\) version = "(\d+)"; //version to be updated');
  const searchLineregExpr = /export const version = (\d+); \/\/ version to replaced/g;
  const result = sed("-i", searchLineregExpr, newLine, file);
}

export function setProductionFlag(file: string) {
  
  
  const newLine = `export const testEnvironment = false;`
  
  // prepare the search
  
  const searchLineregExpr = /export const testEnvironment = true;/g;
  const result = sed("-i", searchLineregExpr, newLine, file);
}