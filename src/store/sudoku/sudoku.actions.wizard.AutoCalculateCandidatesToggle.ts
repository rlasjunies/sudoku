import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
import { store } from '../../store//appStore';

export function action(): Action {
  return {
    name: "WIZARD_AUTOCANDIDATES_TOGGLE",
    payload: {}
  }
}

export function reducer(state: AppState, _action: Action): AppState {
  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      wizardConfiguration: {
        ... state.sudokuPage.wizardConfiguration,
        calculateCandidates: !state.sudokuPage.wizardConfiguration.calculateCandidates
      }
    }
  }
}

store.registerReducer(action().name, reducer);