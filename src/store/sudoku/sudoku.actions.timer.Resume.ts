import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
// import { store } from '../../store//appStore';

export function action(): Action {
  return {
    name: "TIMER_RESUME",
    payload: {}
  }
}

export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      timerOn: true
    }
  }
}

// store.registerReducer(action().name, reducer);