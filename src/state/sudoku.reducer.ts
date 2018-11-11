import { SudokuPageState, sudokuPageInitialState } from "./sudoku.state";
import { SudokuAction } from "./sudoku.actions";
import { CELL_SELECTED_ACTION, cellSelectedReducer } from "./sudoku.actions.cellSelected";
import { GENERATE_BOARD, generateBoardReducer } from "./sudoku.actions.generateBoard";
import { VALUE_TYPED_ACTION, valueTypedReducer } from "./sudoku.actions.valueTyped";
export function sudokuPageReducer(state: SudokuPageState = sudokuPageInitialState, action: SudokuAction) {
  switch (action.type) {
    case CELL_SELECTED_ACTION: {
      return cellSelectedReducer(state, action);
    };
    case GENERATE_BOARD: {
      return generateBoardReducer(state, action);
    };
    case VALUE_TYPED_ACTION: {
      return valueTypedReducer(state, action);
    }
  }

  // return the state if no action reducer is identified
  return state;
}
