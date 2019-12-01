import { Action } from "../../services/store/store";
import { AppState} from '../app.state';
// import { store } from '../appStore';

export function action(): Action {
  return {
    name: "WIZARD_CALCULATE_POSSIBLE_VALUES_TOGGLE",
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
        calculatePossibleValues: !state.sudokuPage.wizardConfiguration.calculatePossibleValues
      }
    }
  }
}

// store.registerReducer(action().name, reducer);