import { sudokuBoardClone } from "../../services/sudoku/sudoku";
import { Action } from "../../services/store/store";
import { AppState} from '../../store//app.state';
import { store } from '../../store//appStore';

export const actionNameDraftNumberTyped = "TYPE_DRAFT_NUMBER";
export function action(value: number): Action {
  return {
    name: actionNameDraftNumberTyped,
    payload: { valueTyped: value }
  }
}

export function reducer(state: AppState, action: Action): AppState {
  const payload = action.payload;
  const currentCell = state.sudokuPage.cellSelected;
  const oldBoard = state.sudokuPage.board;

  let newBoard = sudokuBoardClone(state.sudokuPage.board);

  // TODO: algo a revoir quand fonctionnel avancé, il faut mettre dans des sous fonctions l'ensemeble des cas

  if (currentCell === null) {
    // noting done
  } else if (newBoard.cells[currentCell].seed) {
    // no modification allowed
  } else {
    const value = payload.valueTyped;

    newBoard.cells[currentCell].candidates[value - 1] = newBoard.cells[currentCell].candidates[value - 1] ? false : true;

    return {
      ...state,
      sudokuPage: {
        ...state.sudokuPage,
        board: newBoard,
        boardHistory: [...state.sudokuPage.boardHistory, oldBoard],  // add the oldBoard in the history
      }
    }
  }
  return state;
}

store.registerReducer(actionNameDraftNumberTyped, reducer);