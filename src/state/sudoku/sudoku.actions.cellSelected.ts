import { SudokuAction } from "./sudoku.actions";
import { SudokuPageState } from "./sudoku.state";

export function cellSelectedAction(cell) : SudokuAction {
  return {
    type: "CELL_SELECTED",
    payload: { cellSelected: cell }
  }
}

export function cellSelectedReducer(state:SudokuPageState, action:SudokuAction) : SudokuPageState {
  const cellSelected = action.payload.cellSelected;
  return {
    ...state,
    cellSelected: cellSelected
  }
}