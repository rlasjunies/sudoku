import { Action } from "services/store/store";
import { AppState, store } from "store/index";

export function action(): Action {
  return {
    name: "NAVIGATETO_SPLASHPAGE",
    payload: {}
  }
}

export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    appRoot: {
      ...state.appRoot,
      showSudokuPage: false,
      showCreateNewBoardPage: false,
      showSplashScreenPage: true
    }
  }
};

store.registerReducer(action().name, reducer);