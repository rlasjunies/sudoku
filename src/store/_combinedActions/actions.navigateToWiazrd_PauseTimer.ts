import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
// import { store } from '../../store/appStore';
import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
import * as timerPause from "../../store/sudoku/sudoku.actions.timer.Pause";

export function action(): Action {
  return {
    name: "navigateTo_Wizard_PauseTimer",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const navigateToWizardConfigState = navigateTo.reducer(state, navigateTo.action(navigateTo.pages.sudokuWizard));
  const timerPauseState = timerPause.reducer(navigateToWizardConfigState, action);
  // const resumeGameState = resumerGame.reducer(timerResumeState,action);
  // const pauseGameState = pauseGame.reducer(state, action);
  // const timerPauseState = timerPause.reducer(pauseGameState, action);  
  return timerPauseState;
};

// store.registerReducer(action().name, reducer);