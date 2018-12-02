import { Action } from "../../services/store/store";

export type SplashScreenActionType = 
  "HIDE" | "SHOW";

export interface SplashScreenAction extends Action {
  type: SplashScreenActionType;
  payload: any;
}