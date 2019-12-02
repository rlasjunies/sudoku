import { testEnvironment } from "../../global/global";
import { Action } from "../../services/store/store";
import { AppState} from '../app.state';
// import { store } from '../appStore';

export enum pages {
  home = "sudoku-home",
  about = "page-about",
  authentication = "page-auth",
  newGame = "sudoku-new",
  sudokuGame = "sudoku-page",
  sudokuWizard = "sudoku-wizard"
}
export const NAME = "NAVIGATE_TO";
export function action(url: pages): Action {
  return {
    name: NAME,
    payload: {url: url}
  }
}
export function reducer(state: AppState, _action: Action): AppState {
  testEnvironment && console.log("Navigate to:",_action.payload.url);
  return {
    ...state,
    appRoot: {
      ...state.appRoot,
      url:_action.payload.url
    }
  }
};

// store.registerReducer(NAME, reducer);