import { SudokuLevelType, SudokuBoard, initializeSudokuBoard } from "../../services/sudoku/sudoku";

export interface SudokuPageState {
  board: SudokuBoard;
  // incorrectCells: number[] ;
  // candidatesBoard: boolean[][];
  boardLevel: SudokuLevelType | null;
  cellSelected: number | null;
  boardJustFinish: boolean;
  draftMode:boolean;
  rowSolved: number;
  colSolved: number;
  zoneSolved: number;
  boardSolved: boolean;
  gameOnGoing: boolean;
}
  
const temp = initializeSudokuBoard();
export const sudokuPageInitialState: SudokuPageState = {
  board: temp,
  // incorrectCells: [],
  // candidatesBoard: initializeCandidatesBoard(),
  
  rowSolved: null,
  colSolved: null,
  zoneSolved: null,
  boardSolved: false,
  
  gameOnGoing: false,
  boardLevel: null,
  cellSelected: -1,
  boardJustFinish: false,
  draftMode: false,
};
