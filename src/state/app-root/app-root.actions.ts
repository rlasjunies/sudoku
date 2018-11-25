import { Action } from "services/store/store";

export type AppRootActionType = 
  "NAVIGATETO_SUDOKUPAGE" | "NAVIGATETO_SPLASHPAGE"

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
export function navigateToSplashPageAction() : AppRootAction {
  return {
    type: "NAVIGATETO_SPLASHPAGE",
    payload: {  }
  }
}