
import { sed } from "shelljs";

export function replaceVersionInCode(version: string, file: string) {
  // sed("-i", /(\d+).(\d+).(\d+)/, version(), "../src/pages/splash-screen/splash-screen-page.tsx");
  sed("-i", /(\d+).(\d+).(\d+)/, version, file);
}
