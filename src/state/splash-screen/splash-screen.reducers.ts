import { SplashScreenPageState, splashScreenPageInitialState } from "./splash-screen.state";
import { SplashScreenAction } from "./splash-screen.actions";
import { hideReducer } from "./splash-screen.actions.hide";
import { showReducer } from "./splash-screen.actions.show";

export function splashScreenPageReducer(state: SplashScreenPageState = splashScreenPageInitialState, action: SplashScreenAction) {
  switch (action.type) {
    case "HIDE": {
      return hideReducer(state);
    };
    case "SHOW": {
      return showReducer(state);
    };
  }

  // return the state if no action reducer is identified
  return state;
}
