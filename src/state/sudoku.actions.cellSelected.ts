import { SudokuAction } from "./sudoku.actions";
import { SudokuPageState } from "./sudoku.state";
export const CELL_SELECTED_ACTION = "CELL_SELECTED"; 

export function isCellSelectedAction(state):boolean{
  return state.actionType === CELL_SELECTED_ACTION
}

export function cellSelectedAction(cell) : SudokuAction {
  return {
    type: CELL_SELECTED_ACTION,
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