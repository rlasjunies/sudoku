import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "NAVIGATETO_SPLASHPAGE",
    payload: {}
  }
}

export function mutator(state: AppState, _action: Action): AppState {
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

registerMutator(action().name, mutator);