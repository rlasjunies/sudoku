import { generateSudokuBoard, SudokuLevelType, resolveByRules } from "../../services/sudoku/sudoku";
import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
// import { store } from '../../store//appStore';

export const NAME = "GENERATE_BOARD";
export function action(level: SudokuLevelType): Action {
  return {
    name: NAME,
    payload: {
      level: level
    }
  }
}

export function reducer(state: AppState, action: Action): AppState {
  const level = action.payload.level;
  const board = generateSudokuBoard(level);
  let solutionsByRules = resolveByRules(board);

  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      board: board,
      boardHistory: [board], // initialize the history with the new board
      boardLevel: level,
      cellSelected: -1,
      gameOnGoing: true,
      gameInPause: false,
      solutionsByRules: solutionsByRules
    }
  }
}

// store.registerReducer(NAME, reducer);