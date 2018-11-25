import { SplashScreenAction } from "./splash-screen.actions";
import { SplashScreenPageState } from "./splash-screen.state";

export function hideSplashScreenAction() : SplashScreenAction {
  return {
    type: "HIDE",
    payload: {  }
  }
}

export function hideReducer(state:SplashScreenPageState) : SplashScreenPageState {
  return {
    ...state,
    showPage: false
  }
}