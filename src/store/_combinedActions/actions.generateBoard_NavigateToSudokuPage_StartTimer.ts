import { Action } from "../../services/store/store";
import { AppState} from '../../store/app.state';
import { store } from '../../store/appStore';
import * as navigateToSudokuPage from "../../store/app-root/app-root.actions.navigateToSudokuPage";
import * as generateBoard from "../../store/sudoku/sudoku.actions.generateBoard";
import * as timerStart from "../../store/sudoku/sudoku.actions.timer.Start";


import { SudokuLevelType } from "../../services/sudoku/sudoku";
export function action(level: SudokuLevelType): Action {
  return {
    name: "GENERATEBOARD_NAVTOSUDOKU_STARTTIMER",
    payload: {
      level: level
    }
  }
}
export function reducer(state: AppState, action: Action): AppState {
  const generatedBoardState = generateBoard.reducer(state, action);
  const navigateToSudokuPageState = navigateToSudokuPage.reducer(generatedBoardState,action);
  const timerStartedState = timerStart.reducer(navigateToSudokuPageState,action);
  return timerStartedState;
};

store.registerReducer("GENERATEBOARD_NAVTOSUDOKU_STARTTIMER", reducer);