import { SplashScreenAction } from "./splash-screen.actions";
import { SplashScreenPageState } from "./splash-screen.state";

export function showSplashScreenAction() : SplashScreenAction {
  return {
    type: "SHOW",
    payload: {  }
  }
}

export function showReducer(state:SplashScreenPageState) : SplashScreenPageState {
  return {
    ...state,
    showPage: true
  }
}