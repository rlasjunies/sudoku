import { Action } from "services/store/store";
import { AppState, store } from "store/index";

export function action(): Action {
  return {
    name: "TIMER_START",
    payload: {}
  }
}
export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      timerOn: true,
      timer: 0
    }
  }
}

store.registerReducer(action().name, reducer);