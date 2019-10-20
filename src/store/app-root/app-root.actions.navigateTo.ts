import { Action } from "../../services/store/store";
import { AppState} from '../app.state';
import { store } from '../appStore';

export enum pages {
  home = "sudoku-home",
  about = "page-about",
  authentication = "page-auth",
  newGame = "sudoku-new",
  sudokuGame = "sudoku-page",
  sudokuWizard = "sudoku-wizard"
}
export function action(url: pages): Action {
  return {
    name: "NAVIGATE_TO",
    payload: {url: url}
  }
}
export function reducer(state: AppState, _action: Action): AppState {
  console.log("Navigate to:",_action.payload.url);
  return {
    ...state,
    appRoot: {
      ...state.appRoot,
      url:_action.payload.url
    }
  }
};

store.registerReducer(action(pages.home).name, reducer);