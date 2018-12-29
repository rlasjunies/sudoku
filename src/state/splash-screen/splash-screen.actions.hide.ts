import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "SPLASHSCREEN-HIDE",
    payload: {
    }
  }
}
export function mutator(state: AppState, _action: Action): AppState {
  return {
    ...state,
    splashScreenPage: {
      ...state.splashScreenPage,
      showPage: false
    }
  }
};

registerMutator(action().name, mutator);