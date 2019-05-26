import { Action } from "services/store/store";
import { AppState, store } from "store/index";

export function action(): Action {
  return {
    name: "WIZARD_SHOWSUNIQUECANDIDATEINCELL_TOGGLE",
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
        showUniqueCandidate: !state.sudokuPage.wizardConfiguration.showUniqueCandidate
      }
    }
  }
}

store.registerReducer(action().name, reducer);