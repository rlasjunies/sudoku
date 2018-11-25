import { Action } from "../services/store/store";
import { SudokuActionType } from "./sudoku/sudoku.actions";
import { SplashScreenActionType } from "./splash-screen/splash-screen.actions";
import { AppRootActionType } from "./app-root/app-root.actions";

export type AppActionType = 
  SudokuActionType | 
  SplashScreenActionType | 
  AppRootActionType;

export interface AppAction extends Action {
  type: AppActionType;
  payload: any;
}
