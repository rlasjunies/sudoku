import { Action } from "services/store/store";

export type AppRootActionType = 
  "NAVIGATETO_SUDOKUPAGE" | "NAVIGATETO_SPLASHPAGE" | "NAVIGATETO_CREATENEWBAORD";

  export interface AppRootAction extends Action {
  type: AppRootActionType;
  payload: any;
}

export function navigateToSudokuPageAction() : AppRootAction {
  return {
    type: "NAVIGATETO_SUDOKUPAGE",
    payload: {  }
  }
}
export function navigateToSplashScreenPageAction() : AppRootAction {
  return {
    type: "NAVIGATETO_SPLASHPAGE",
    payload: {  }
  }
}

export function navigateToCreateNewBordPageAction() : AppRootAction {
  return {
    type: "NAVIGATETO_CREATENEWBAORD",
    payload: {  }
  }
}