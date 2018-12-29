import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "TIMER_TICK",
    payload: {}
  }
}
export function mutator(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage:{
      ...state.sudokuPage,
      timer: state.sudokuPage.timer + 1
    }
  }
}

registerMutator(action().name, mutator);