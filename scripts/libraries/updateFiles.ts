
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