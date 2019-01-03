import { Action } from "services/store/store";
import { AppState, store } from "store/index";
import * as navigateToSudoku from "store/app-root/app-root.actions.navigateToSudokuPage";
import * as timerResume from "store/sudoku/sudoku.actions.timer.Resume";
import * as resumerGame from "store/sudoku/sudoku.actions.resumeGame";

export function action(): Action {
  return {
    name: "navigateToSudoku_ResumeTimer",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const navigateToSudokuState = navigateToSudoku.reducer(state, action);
  const timerResumeState = timerResume.reducer(navigateToSudokuState, action);
  const  resumeGameState = resumerGame.reducer(timerResumeState,action);  
  return resumeGameState;
};

store.registerReducer(action().name, reducer);