import { Action } from "services/store/store";
import { AppState, store } from "store/index";

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