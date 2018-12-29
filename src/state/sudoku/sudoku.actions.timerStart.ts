import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "TIMER_START",
    payload: {}
  }
}
export function mutator(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      timerOn: true,
      timer: 0
    }
  }
}

registerMutator(action().name, mutator);