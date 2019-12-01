import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
// import { store } from '../../store/appStore';
import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
import * as timerResume from "../../store/sudoku/sudoku.actions.timer.Resume";
import * as resumerGame from "../../store/sudoku/sudoku.actions.resumeGame";

export function action(): Action {
  return {
    name: "navigateToSudoku_ResumeTimer",
    payload: {}
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const navigateToSudokuState = navigateTo.reducer(state, navigateTo.action(navigateTo.pages.sudokuGame));
  const timerResumeState = timerResume.reducer(navigateToSudokuState, action);
  const  resumeGameState = resumerGame.reducer(timerResumeState,action);  
  return resumeGameState;
};

// store.registerReducer(action().name, reducer);