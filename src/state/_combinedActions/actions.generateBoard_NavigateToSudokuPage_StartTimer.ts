import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";
import * as navigateToSudokuPage from "state/app-root/app-root.actions.navigateToSudokuPage";
import * as generateBoard from "state/sudoku/sudoku.actions.generateBoard";
import * as timerStart from "state/sudoku/sudoku.actions.timer.Start";

import { SudokuLevelType } from "services/sudoku/sudoku";
export function action(level: SudokuLevelType): Action {
  return {
    name: "GENERATEBOARD_NAVTOSUDOKU_STARTTIMER",
    payload: {
      level: level
    }
  }
}
export function mutator(state: AppState, action: Action): AppState {
  const generatedBoardState = generateBoard.mutator(state, action);
  const navigateToSudokuPageState = navigateToSudokuPage.mutator(generatedBoardState,action);
  const timerStartedState = timerStart.mutator(navigateToSudokuPageState,action);
  return timerStartedState;
};

registerMutator("GENERATEBOARD_NAVTOSUDOKU_STARTTIMER", mutator);