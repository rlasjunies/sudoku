import { exec, echo } from "shelljs";

export function version(): string {
  echo(`je suis là:${process.cwd()}`);
  const packageJsonFullName = `${process.cwd()}/package.json`;
  const version = require(packageJsonFullName).version;
  return version;
}
export function IncrementPatchVersion_WithNoCitTag() {
  exec("npm version patch --no-git-tag-version")
}
export function IncrementMajorVersion_WithNoCitTag() {
  exec("npm version major --no-git-tag-version")
}

export function IncrementMinorVersion_WithNoCitTag() {
  exec("npm version minor --no-git-tag-version")
}