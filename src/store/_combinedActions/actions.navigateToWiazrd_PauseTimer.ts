import { Action } from "services/store/store";
import { AppState, store } from "store/index";
// import * as navigateToSudoku from "store/app-root/app-root.actions.navigateToSudokuPage";
import * as navigateToWizardConfig from "store/app-root/app-root.actions.navigateToWizardConfiguration";
import * as timerPause from "store/sudoku/sudoku.actions.timer.Pause";
// import * as resumerGame from "store/sudoku/sudoku.actions.resumeGame";

export function action(): Action {
  return {
    name: "navigateTo_Wizard_PauseTimer",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const navigateToWizardConfigState = navigateToWizardConfig.reducer(state, action);
  const timerPauseState = timerPause.reducer(navigateToWizardConfigState, action);
  // const resumeGameState = resumerGame.reducer(timerResumeState,action);
  // const pauseGameState = pauseGame.reducer(state, action);
  // const timerPauseState = timerPause.reducer(pauseGameState, action);  
  return timerPauseState;
};

store.registerReducer(action().name, reducer);