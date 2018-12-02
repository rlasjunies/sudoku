import { SudokuPageState, sudokuPageInitialState } from "./sudoku.state";
import { SudokuAction } from "./sudoku.actions";
import { CELL_SELECTED_ACTION, cellSelectedReducer } from "./sudoku.actions.cellSelected";
import { GENERATE_BOARD, generateBoardReducer } from "./sudoku.actions.generateBoard";
import { valueTypedReducer } from "./sudoku.actions.valueTyped";
import { swtichModeReducer } from "./sudoku.actions.switchDraftMode";
export function sudokuPageReducer(state: SudokuPageState = sudokuPageInitialState, action: SudokuAction) {
  switch (action.type) {
    case CELL_SELECTED_ACTION: {
      return cellSelectedReducer(state, action);
    };
    case GENERATE_BOARD: {
      return generateBoardReducer(state, action);
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
  }

  // return the state if no action reducer is identified
  return state;
}
