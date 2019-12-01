import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
// import { store } from '../../store/appStore';
import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
import * as generateBoard from "../../store/sudoku/sudoku.actions.generateBoard";
import * as timerStart from "../../store/sudoku/sudoku.actions.timer.Start";


import { SudokuLevelType } from "../../services/sudoku/sudoku";
export const NAME = "GENERATEBOARD_NAVTOSUDOKU_STARTTIMER"; 
export function action(level: SudokuLevelType): Action {
  return {
    name: NAME,
    payload: {
      level: level
    }
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const generatedBoardState = generateBoard.reducer(state, action);
  const navigateToSudokuPageState = navigateTo.reducer(generatedBoardState, navigateTo.action(navigateTo.pages.sudokuGame) );
  const timerStartedState = timerStart.reducer(navigateToSudokuPageState,action);
  return timerStartedState;
};

// store.registerReducer(NAME, reducer);