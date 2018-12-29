import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "NAVIGATETO_SUDOKUPAGE",
    payload: {}
  }
}

export function mutator(state: AppState, _action: Action): AppState {
  return {
    ...state,
    appRoot: {
      ...state.appRoot,
      showSudokuPage: true,
      showSplashScreenPage: false,
      showCreateNewBoardPage: false
    }
  }
};

registerMutator(action().name, mutator);