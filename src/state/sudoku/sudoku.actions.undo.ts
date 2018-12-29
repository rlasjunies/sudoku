import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export function action(): Action {
  return {
    name: "UNDO",
    payload: {}
  }
}

export function mutator(state: AppState, _action: Action): AppState {
  if (state.sudokuPage.boardHistory.length > 1) { // 1st element cannot be undone
    const newBoard = state.sudokuPage.boardHistory.pop();
    const newHistory = [...state.sudokuPage.boardHistory]
    return {
      ...state,
      sudokuPage: {
        ...state.sudokuPage,
        board: newBoard,
        boardHistory: newHistory, // initialize the history with the new board
      }
    }
  } else {
    // 1st element cannot be undone
    return state;
  }
}

registerMutator(action().name, mutator);