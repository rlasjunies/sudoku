import { exec } from "shelljs";


export function deploy(){
  exec("firebase deploy");
}