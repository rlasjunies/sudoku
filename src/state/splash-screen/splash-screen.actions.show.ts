import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "SPLASHSCREEN-SHOW",
    payload: {}
  }
}

export function mutator(state: AppState): AppState {
  return {
    ...state,
    splashScreenPage: {
      ...state.splashScreenPage,
      showPage: true
    }
  }
}

registerMutator(action().name, mutator);