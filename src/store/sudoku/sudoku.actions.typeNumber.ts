import { isRowSolvedx, blockOfCellNumber, isColSolvedx, isBlockSolvedx, rowOfCellNumber, colOfCellNumber, isBoardSolvedx, sudokuBoardClone, remainingNumbers, removeDraftedValueInZone, resolverWorkForce, isPossibleNumberx, resolveByRules } from "../../services/sudoku/sudoku";
import { Action } from "../../services/store/store";
import { AppState } from '../../store//app.state';
// import { store } from '../../store//appStore';
import { testEnvironment } from "../../global/global";
const DEV_MODE = ['%c[Action-TypeNumber]', 'color:#ff11ff;font-weight: bold'];

export const NAME = "TYPE_NUMBER";
export function action(value: number): Action {
  return {
    name: NAME,
    payload: { valueTyped: value }
  }
}

export function reducer(state: AppState, action: Action): AppState {
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
  let solutionsByRules = null;

  const value = payload.valueTyped;
  // TODO: algo a revoir quand fonctionnel avancé, il faut mettre dans des sous fonctions l'ensemeble des cas
  
  if ((currentCell === null) || 
  (state.sudokuPage.board.cells[currentCell].seed) ||
  (state.sudokuPage.board.cells[currentCell].value === value)) {
    // nothing done
    testEnvironment && console.debug(...DEV_MODE,`skip type number BL`);

    return state;
  } else {
    let newBoard = sudokuBoardClone(state.sudokuPage.board);
    

    // remove the value of the cell of the current board. because PossibleNumber check the value already in the board
    // oldBoard.cells[currentCell].value = null;

    // managed incorrect cell
    // const isValueCorrect = isPossibleNumberx(currentCell, value, oldBoard);
    // the value is not correct when the value is not the same as the expected One
    // console.log("check is value is correct", value, newBoard.cells[currentCell].expectedValue, (value == newBoard.cells[currentCell].expectedValue))
    // const isValueCorrect = (value == newBoard.cells[currentCell].expectedValue) ? true : false;

    const isValuePossible = isPossibleNumberx(currentCell, value, oldBoard);
    let isValueCorrect = false;
    if (isValuePossible) {
      newBoard.cells[currentCell].value = value;
      ({ resolved: isValueCorrect } = resolverWorkForce(currentCell, newBoard));
    }
    
    // remove the value from the list if already exists
    // TODO: create an array library - retrieve the one from uacommander
    testEnvironment && console.debug(...DEV_MODE,`isValuePossible:${isValuePossible} - isValueCorrect:${isValueCorrect} incorrect cells before:`,newBoard.incorrectCells);
    newBoard.incorrectCells = newBoard.incorrectCells.filter((cellNumber) => cellNumber !== currentCell)
    if (!isValueCorrect) {
      newBoard.incorrectCells.push(currentCell);
    }
    testEnvironment && console.debug(...DEV_MODE,`isValuePossible:${isValuePossible} - isValueCorrect:${isValueCorrect} incorrect cells AFTER:`,newBoard.incorrectCells);

    // insert the value in the board even if incorrect, 
    // if incorrect the value will be highlighted to the player
    newBoard.cells[currentCell].value = value;

    // check if zones are solved in order to provide animation for the player
    rowSolved = isRowSolvedx(row, newBoard) ? row : null;
    colSolved = isColSolvedx(col, newBoard) ? col : null;
    blockSolved = isBlockSolvedx(block, newBoard) ? block : null;
    boardSolved = isBoardSolvedx(newBoard) ? true : false;

    // remove equal drafted in the related zones
    // only when the value is correct
    // TODO: this should be done in the service, 
    if (isValueCorrect) {
      newBoard = removeDraftedValueInZone(newBoard, value, currentCell);
    }

    // TODO: this should be done in the service, 
    // newBoard = possibleValues(newBoard);

    solutionsByRules = resolveByRules(newBoard);

    // console.log(` [${col}-${row}-${block}] rowSolved:${rowSolved} - colSolved:${colSolved} - blockSolved:${blockSolved} - boardSolved:${boardSolved}`);
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
        solutionsByRules: solutionsByRules
      }
    }
  }
}

// store.registerReducer(NAME, reducer);