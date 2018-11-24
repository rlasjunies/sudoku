import { SudokuLevelType, initializeCandidatesBoard } from "../services/sudoku/sudoku";

export interface SudokuPageState {
  board: number[];
  candidatesBoard: boolean[][];
  boardLevel: SudokuLevelType | null;
  cellSelected: number | null;
  incorrectCells: number[] ;
  boardJustFinish: boolean;
  draftMode:boolean;
  rowSolved: number;
  colSolved: number;
  zoneSolved: number;
  boardSolved: boolean;
}
  
export const sudokuPageInitialState: SudokuPageState = {
  board: Array(81),
  boardLevel: null,
  cellSelected: null,
  incorrectCells: [],
  boardJustFinish: false,
  draftMode: false,
  candidatesBoard: initializeCandidatesBoard(),
  rowSolved: null,
  colSolved: null,
  zoneSolved: null,
  boardSolved: false
};
