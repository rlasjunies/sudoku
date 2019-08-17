import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
import { store } from '../../store//appStore';

export function action(): Action {
  return {
    name: "WIZARD_SHOWSUNIQUECANDIDATEINZONE_TOGGLE",
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
        showUniquePossiblrValueInZones: !state.sudokuPage.wizardConfiguration.showUniquePossiblrValueInZones
      }
    }
  }
}

store.registerReducer(action().name, reducer);