import { testEnvironment } from "../global/global";
const DEV_MODE = ['%c[HELPER]', 'color:#ff11ff;font-weight: bold'];
export function isNullOrEmpty(data:any){
  let result = false;
  if(!data){ result = true }
  testEnvironment && console.debug(...DEV_MODE,`data:${data} - return:${!data}`);
  return result;
}

