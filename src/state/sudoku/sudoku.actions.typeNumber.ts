import { isRowSolvedx, blockOfCellNumber, isColSolvedx, isBlockSolvedx, rowOfCellNumber, colOfCellNumber, isBoardSolvedx, sudokuBoardClone, remainingNumbers, removeCandidateBoard } from "../../services/sudoku/sudoku";
import { Action, registerMutator } from "services/store/store";
import { AppState } from "state/app.state";

export const actionNameNumberTyped = "TYPE_NUMBER";
export function action(value: number): Action {
  return {
    name: actionNameNumberTyped,
    payload: { valueTyped: value }
  }
}

export function mutator(state: AppState, action: Action): AppState {
  const payload = action.payload;
  const currentCell = state.sudokuPage.cellSelected;
  const oldBoard = state.sudokuPage.board;
  const row = rowOfCellNumber(currentCell);
  const col = colOfCellNumber(currentCell);
  const block = blockOfCellNumber(currentCell);
  
  let rowSolved: number | null = null;
  let colSolved: number | null = null;
  let blockSolved: number | null = null;
  let boardSolved: boolean = false;

  let newBoard = sudokuBoardClone(state.sudokuPage.board);

  // TODO: algo a revoir quand fonctionnel avancé, il faut mettre dans des sous fonctions l'ensemeble des cas

  if (currentCell === null) {
    // noting done
  } else if (newBoard.cells[currentCell].seed) {
    // no modification allowed
  } else {
    const value = payload.valueTyped;

    // remove the value of the cell of the current board. because PossibleNumber check the value already in the board
    // oldBoard.cells[currentCell].value = null;

    // managed incorrect cell
    // const isValueCorrect = isPossibleNumberx(currentCell, value, oldBoard);
    // the value is not correct when the value is not the same as the expected One
    // console.log("check is value is correct", value, newBoard.cells[currentCell].expectedValue, (value == newBoard.cells[currentCell].expectedValue))
    const isValueCorrect = (value == newBoard.cells[currentCell].expectedValue) ? true : false;

    // remove the value from the list if already exists
    // TODO: create an array library - retrieve the one from uacommander
    newBoard.incorrectCells = newBoard.incorrectCells.filter((cellNumber) => cellNumber !== currentCell)
    if (!isValueCorrect) {
      newBoard.incorrectCells.push(currentCell);
    }

    // insert the value in the board even if incorrect, 
    // if incorrect the value will be highlighted to the player
    newBoard.cells[currentCell].value = value;

    // check if zones are solved in order to provide animation for the player
    rowSolved = isRowSolvedx(row, newBoard) ? row : null;
    colSolved = isColSolvedx(col, newBoard) ? col : null;
    blockSolved = isBlockSolvedx(block, newBoard) ? block : null;
    boardSolved = isBoardSolvedx(newBoard) ? true : false;

    // remove equal candidates in the related zones
    // only when the value is correct
    if (isValueCorrect) {
      newBoard = removeCandidateBoard(newBoard, value, currentCell);
    }

    // console.log(` [${col}-${row}-${block}] rowSolved:${rowSolved} - colSolved:${colSolved} - blockSolved:${blockSolved} - boardSolved:${boardSolved}`);
  }
  newBoard.remainingNumbers = remainingNumbers(newBoard.cells);

  return {
    ...state,
    sudokuPage: {
      ...state.sudokuPage,
      board: newBoard,
      boardHistory: [...state.sudokuPage.boardHistory, oldBoard],  // add the oldBoard in the history
      rowSolved: rowSolved,
      colSolved: colSolved,
      blockSolved: blockSolved,
      boardSolved: boardSolved,
    }
  }
}

registerMutator(actionNameNumberTyped, mutator);