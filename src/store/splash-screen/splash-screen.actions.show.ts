import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
import { store } from '../../store/appStore';

export function action(): Action {
  return {
    name: "SPLASHSCREEN-SHOW",
    payload: {}
  }
}

export function reducer(state: AppState): AppState {
  return {
    ...state,
    splashScreenPage: {
      ...state.splashScreenPage,
      showPage: true
    }
  }
}

store.registerReducer(action().name, reducer);