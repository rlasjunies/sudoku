import { AppAction } from "../app.actions";
import { SudokuPageState } from "./sudoku.state";
import { SudokuAction } from "./sudoku.actions";

export function undoAction(): AppAction {
  return {
    type: "UNDO",
    payload: {}
  }
}

export function undoReducer(state: SudokuPageState, _action: SudokuAction): SudokuPageState {
  if (state.boardHistory.length > 1) { // 1st element cannot be undone
    const newBoard = state.boardHistory.pop();
    const newHistory = [...state.boardHistory]
    return {
      ...state,
      board: newBoard,
      boardHistory: newHistory, // initialize the history with the new board
    }
  } else {
     // 1st element cannot be undone
    return state;
  }
}