import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
import { store } from '../../store/appStore';

export function action(): Action {
  return {
    name: "SPLASHSCREEN-HIDE",
    payload: {
    }
  }
}
export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    splashScreenPage: {
      ...state.splashScreenPage,
      showPage: false
    }
  }
};

store.registerReducer(action().name, reducer);