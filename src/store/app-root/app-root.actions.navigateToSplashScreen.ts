import { store } from '../../store/appStore';
import { AppState} from '../../store/app.state';
import { Action } from "../../services/store/store";
export function action(): Action {
  return {
    name: "NAVIGATETO_SPLASHPAGE",
    payload: {}
  }
}

export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    appRoot: {
      ...state.appRoot,
      showSudokuPage: false,
      showCreateNewBoardPage: false,
      showSplashScreenPage: true,
      showSudokuWizardPage: false
    }
  }
};

store.registerReducer(action().name, reducer);