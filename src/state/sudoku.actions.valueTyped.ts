import { SudokuAction } from "./sudoku.actions";
import { SudokuPageState } from "./sudoku.state";
import { updateBoard, isPossibleNumber } from "../services/sudoku/sudoku";
export const VALUE_TYPED_ACTION = "VALUE_TYPED";

interface valueTypeActionPayload {
  valueTyped: number
}
export function valueTypedAction(value: number): SudokuAction {
  return {
    type: VALUE_TYPED_ACTION,
    payload: { valueTyped: value }
  }
}

export function valueTypedReducer(state: SudokuPageState, action: SudokuAction): SudokuPageState {
  const payload: valueTypeActionPayload = action.payload;
  const currentCell = state.cellSelected;
  const currentBoard = state.board;

  let newCandidatesBoard = [...state.candidatesBoard];
  let newIncorrectCells = [...state.incorrectCells];
  let newBoard = [...state.board];

  // TODO: algo a revoir quand fonctionnel avancé, il faut mettre dans des sous fonctions l'ensemeble des cas


  if (currentCell === null) {
    // TODO
    // return {
    //   ...state,
    //   messageToNotify: "Select a cell before";
    // }
  } else {
    const value = payload.valueTyped;

    if (state.draftMode === true) {
      // console.log(`dans typed action, drftamode:`,state.draftMode);
      // switch value in the candidates
      // console.log(`newCandidatesBoard[${currentCell}][${value}] avant`, newCandidatesBoard[currentCell][value]);
      newCandidatesBoard[currentCell][value - 1] = newCandidatesBoard[currentCell][value - 1] ? false : true;
      // console.log(`newCandidatesBoard[${currentCell}][${value}] aprés`, newCandidatesBoard[currentCell][value]);
    } else {
      // managed incorrect cell
      const isValueCorrect = isPossibleNumber(currentCell, value, currentBoard);

      // remove the value from the list if already exists
      // TODO: create an array library - retrieve the one from uacommander
      newIncorrectCells = newIncorrectCells.filter((cellNumber) => cellNumber !== currentCell)
      if (!isValueCorrect) {
        newIncorrectCells.push(currentCell);
      }

      newBoard = updateBoard(value, currentCell, currentBoard);
    }

    return {
      ...state,
      board: newBoard,
      incorrectCells: newIncorrectCells,
      candidatesBoard: newCandidatesBoard
    }
  }
}