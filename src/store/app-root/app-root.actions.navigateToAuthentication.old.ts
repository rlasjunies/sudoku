import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
import { store } from '../../store/appStore';

export function action(): Action {
  return {
    name: "NAVIGATETO_AUTHENTICATION",
    payload: {}
  }
}
export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    appRoot: {
      ...state.appRoot,
      url:"page-auth"
    }
  }
};

store.registerReducer(action().name, reducer);