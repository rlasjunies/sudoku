import { Action } from "../../services/store/store";
import { AppState} from '../app.state';
// import { store } from '../appStore';

export function action(): Action {
  return {
    name: "WIZARD_SHOWS_IDENTICAL_NUMBERS_TOGGLE",
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
        showIdenticalNumber: !state.sudokuPage.wizardConfiguration.showIdenticalNumber
      }
    }
  }
}

// store.registerReducer(action().name, reducer);