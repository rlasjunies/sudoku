import { SudokuAction } from "./sudoku.actions";
import { SudokuPageState } from "./sudoku.state";
import { isPossibleNumberx, isRowSolvedx, zoneOfCellNumber, isColSolvedx, isZoneSolvedx, rowOfCellNumber, colOfCellNumber, isBoardSolvedx, sudokuBoardClone } from "../../services/sudoku/sudoku";
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
  let rowSolved: number | null = null;
  let colSolved: number | null = null;
  let zoneSolved: number | null = null;
  let boardSolved: boolean = false;

  // let newCandidatesBoard = [...state.candidatesBoard];
  // let newIncorrectCells = [...state.incorrectCells];
  let newBoard = sudokuBoardClone(state.board);

  // TODO: algo a revoir quand fonctionnel avancé, il faut mettre dans des sous fonctions l'ensemeble des cas

  if (currentCell === null) {
    // noting done
  } else if (newBoard.cells[currentCell].initialeValue) {
    // no modification allowed
  } else {
    const value = payload.valueTyped;

    if (action.type === "CLEAR_TYPED") {
      // newCandidatesBoard[currentCell]= [];
      newBoard.cells[currentCell].candidates = [];
      // newBoard = updateBoardx(null, currentCell, currentBoard);
      newBoard.cells[currentCell].value = null;
      // remove the cell of the incorrect cells
      newBoard.incorrectCells = newBoard.incorrectCells.filter((cellNumber) => cellNumber !== currentCell);
    } else {

      if (state.draftMode === true) {
        // switch value in the candidates
        // newCandidatesBoard[currentCell][value - 1] = newCandidatesBoard[currentCell][value - 1] ? false : true;
        newBoard.cells[currentCell].candidates[value - 1] = newBoard.cells[currentCell].candidates[value - 1] ? false : true;

      } else {

        // remove the value of the cell of the current board. because PossibleNumber check the value already in the board
        currentBoard.cells[currentCell].value = null;

        // managed incorrect cell
        const isValueCorrect = isPossibleNumberx(currentCell, value, currentBoard);

        // remove the value from the list if already exists
        // TODO: create an array library - retrieve the one from uacommander
        newBoard.incorrectCells = newBoard.incorrectCells.filter((cellNumber) => cellNumber !== currentCell)
        if (!isValueCorrect) {
          newBoard.incorrectCells.push(currentCell);
        }
        // newBoard = updateBoard(value, currentCell, currentBoard);
        newBoard.cells[currentCell].value = value;
        rowSolved = isRowSolvedx(row, newBoard) ? row : null;
        colSolved = isColSolvedx(col, newBoard) ? col : null;
        zoneSolved = isZoneSolvedx(zone, newBoard) ? zone : null;
        boardSolved = isBoardSolvedx(newBoard) ? true : false;

        // console.log(` [${col}-${row}-${zone}] rowSolved:${rowSolved} - colSolved:${colSolved} - zoneSolved:${zoneSolved} - boardSolved:${boardSolved}`);
      }
    }

    return {
      ...state,
      board: newBoard,
      // incorrectCells: newIncorrectCells,
      // candidatesBoard: newCandidatesBoard,
      rowSolved: rowSolved,
      colSolved: colSolved,
      zoneSolved: zoneSolved,
      boardSolved: boardSolved
    }
  }
  return state;
}