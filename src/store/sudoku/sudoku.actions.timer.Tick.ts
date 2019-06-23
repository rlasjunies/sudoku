import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';

export function action(): Action {
  return {
    name: "TIMER_TICK",
    payload: {}
  }
}
export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage:{
      ...state.sudokuPage,
      timer: state.sudokuPage.timer + 1
    }
  }
}

// export let registerTimerTick = store.registerMutator(action().name, reducer);