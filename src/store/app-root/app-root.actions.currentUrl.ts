import { Action } from "../../services/store/store";
import { AppState} from '../app.state';
import { store } from '../appStore';

export function action(url: string): Action {
  return {
    name: "CURRENT_URL",
    payload: {url: url}
  }
}
export function reducer(state: AppState, _action: Action): AppState {
  console.log("Dans CURRENT_URL");
  return {
    ...state,
    appRoot: {
      ...state.appRoot,
      url:_action.payload.url
    }
  }
};

store.registerReducer(action("").name, reducer);