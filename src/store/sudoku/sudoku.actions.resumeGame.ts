import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
// import { store } from '../../store//appStore';

export function action(): Action {
  return {
    name: "RESUME_GAME",
    payload: {}
  }
}

export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      gameInPause: false,
    }
  }
}

// store.registerReducer(action().name, reducer);