import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
import { store } from '../../store/appStore';

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
      showSplashScreenPage: false,
      showSudokuWizardPage: false
    }
  }
};

store.registerReducer(action().name, reducer);