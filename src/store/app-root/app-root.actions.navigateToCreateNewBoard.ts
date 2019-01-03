import { Action } from "services/store/store";
import { AppState, store } from "store/index";

export function action(): Action {
  return {
    name: "NAVIGATETO_CREATENEWBAORD",
    payload: {}
  }
}
export function reducer(state: AppState, _action: Action): AppState {
  console.log("Dans NAVIGATETO_CREATENEWBAORD");
  return {
    ...state,
    appRoot: {
      ...state.appRoot,
      showSudokuPage: false,
      showCreateNewBoardPage: true,
      showSplashScreenPage: false
    }
  }
};

store.registerReducer(action().name, reducer);