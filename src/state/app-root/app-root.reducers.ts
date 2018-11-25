import { AppRootState, appRootInitialState } from "./app-root.state";
import { Action } from "services/store/store";
import { AppRootActionType } from "./app-root.actions";

export interface AppRootAction extends Action {
  type: AppRootActionType;
  payload: any;
}


export function appRootReducer(state: AppRootState = appRootInitialState, action: AppRootAction) {
  switch (action.type) {
    case "NAVIGATETO_SUDOKUPAGE": {
      return {
        ...state,
        showSudokuPage: true,
        showSplashScreenPage:false
      }
    };
    case "NAVIGATETO_SPLASHPAGE": {
      return {
        ...state,
        showSudokuPage: false,
        showSplashScreenPage:true
      }
    };
  }

  // return the state if no action reducer is identified
  return state;
}
