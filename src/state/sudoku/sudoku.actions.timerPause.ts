import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "TIMER_PAUSE",
    payload: {}
  }
}

export function mutator(state: AppState, _action: Action): AppState {

  return {
    ...state,
    sudokuPage:{
      ...state.sudokuPage,
      timerOn: false
    }
  }
}

registerMutator(action().name, mutator);