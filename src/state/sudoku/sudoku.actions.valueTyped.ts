import { SudokuAction } from "./sudoku.actions";
import { SudokuPageState } from "./sudoku.state";
import { updateBoard, isPossibleNumber, isRowSolved, rowOfCellNumber, colOfCellNumber, zoneOfCellNumber, isColSolved, isZoneSolved, isBoardSolved } from "../../services/sudoku/sudoku";
// export const VALUE_TYPED_ACTION = 

export type keyboardActionType =
  "NUMBER_TYPED" | "CLEAR_TYPED";

interface valueTypeActionPayload {
  valueTyped: number
}
export function numberTypedAction(value: number): SudokuAction {
  return {
    type: "NUMBER_TYPED",
    payload: { valueTyped: value }
  }
}
export function clearTypedAction(): SudokuAction {
  return {
    type: "CLEAR_TYPED",
    payload: { valueTyped: null }
  }
}

export function valueTypedReducer(state: SudokuPageState, action: SudokuAction): SudokuPageState {
  const payload: valueTypeActionPayload = action.payload;
  const currentCell = state.cellSelected;
  const currentBoard = state.board;
  const row = rowOfCellNumber(currentCell);
  const col = colOfCellNumber(currentCell);
  const zone = zoneOfCellNumber(currentCell);
  let rowSolved: number | null;
  let colSolved: number | null;
  let zoneSolved: number | null;
  let boardSolved: boolean;

  let newCandidatesBoard = [...state.candidatesBoard];
  let newIncorrectCells = [...state.incorrectCells];
  let newBoard = [...state.board];

  // TODO: algo a revoir quand fonctionnel avancé, il faut mettre dans des sous fonctions l'ensemeble des cas

  if (currentCell === null) {
    // noting done
  } else {
    const value = payload.valueTyped;

    if (action.type === "CLEAR_TYPED") {
        newCandidatesBoard[currentCell]= [];
        newBoard = updateBoard(null, currentCell, currentBoard);
        // remove the cell of the incorrect cells
        newIncorrectCells = newIncorrectCells.filter((cellNumber) => cellNumber !== currentCell);
    } else {

      if (state.draftMode === true) {
        // switch value in the candidates
        newCandidatesBoard[currentCell][value - 1] = newCandidatesBoard[currentCell][value - 1] ? false : true;

      } else {

        // remove the value of the cell of the current board. because PossibleNumber check the value already in the board
        currentBoard[currentCell] = null;

        // managed incorrect cell
        const isValueCorrect = isPossibleNumber(currentCell, value, currentBoard);

        // remove the value from the list if already exists
        // TODO: create an array library - retrieve the one from uacommander
        newIncorrectCells = newIncorrectCells.filter((cellNumber) => cellNumber !== currentCell)
        if (!isValueCorrect) {
          newIncorrectCells.push(currentCell);
        }
        newBoard = updateBoard(value, currentCell, currentBoard);
        rowSolved = isRowSolved(row, newBoard) ? row : null;
        colSolved = isColSolved(col, newBoard) ? col : null;
        zoneSolved = isZoneSolved(zone, newBoard) ? zone : null;
        boardSolved = isBoardSolved(newBoard) ? true : false;

        // console.log(` [${col}-${row}-${zone}] rowSolved:${rowSolved} - colSolved:${colSolved} - zoneSolved:${zoneSolved} - boardSolved:${boardSolved}`);
      }
    }

    return {
      ...state,
      board: newBoard,
      incorrectCells: newIncorrectCells,
      candidatesBoard: newCandidatesBoard,
      rowSolved: rowSolved,
      colSolved: colSolved,
      zoneSolved: zoneSolved,
      boardSolved: boardSolved
    }
  }
}