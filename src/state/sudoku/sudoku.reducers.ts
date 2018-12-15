import { SudokuPageState, sudokuPageInitialState } from "./sudoku.state";
import { SudokuAction } from "./sudoku.actions";
import { cellSelectedReducer } from "./sudoku.actions.cellSelected";
import { generateBoardReducer } from "./sudoku.actions.generateBoard";
import { valueTypedReducer } from "./sudoku.actions.valueTyped";
import { swtichModeReducer } from "./sudoku.actions.switchDraftMode";
import { undoReducer } from "./sudoku.actions.undo";
import { timerReducer } from "./sudoku.actions.timer";

export function sudokuPageReducer(state: SudokuPageState = sudokuPageInitialState, action: SudokuAction) {
  switch (action.type) {
    case "GENERATE_BOARD": {
      return generateBoardReducer(state, action);
    };
    case "CELL_SELECTED": {
      return cellSelectedReducer(state, action);
    };
    case "CLEAR_TYPED": {
      return valueTypedReducer(state, action);
    }
    case "NUMBER_TYPED": {
      return valueTypedReducer(state, action);
    }
    case "SWITCH_DRAFT_MODE": {
      return swtichModeReducer(state, action);
    }
    case "UNDO": {
      return undoReducer(state, action);
    }
    case "TIMER_PAUSE":
    case "TIMER_RESUME":
    case "TIMER_START":
    case "TIMER_TICK": {
      return timerReducer(state,action);
    }
  }

  // return the state if no action reducer is identified
  return state;
}
