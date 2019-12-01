import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
// import { store } from '../../store//appStore';


export function action(): Action {
  return {
    name: "UNDO_LAST_MOVE",
    payload: {}
  }
}

export function reducer(state: AppState, _action: Action): AppState {
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

// store.registerReducer(action().name, reducer);