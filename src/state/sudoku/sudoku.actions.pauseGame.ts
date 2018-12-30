import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "PAUSE_GAME",
    payload: {}
  }
}

export function mutator(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      gameInPause: true,
    }
  }
}

registerMutator(action().name, mutator);