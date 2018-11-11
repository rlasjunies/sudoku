import { SudokuLevelType } from "../services/sudoku/sudoku";

export interface SudokuPageState {
  board: number[];
  boardLevel: SudokuLevelType | null;
  cellSelected: number | null;
  incorrectCells: number[] ;
  boardJustFinish: boolean;

}
export const sudokuPageInitialState: SudokuPageState = {
  board: Array(81),
  boardLevel: null,
  cellSelected: null,
  incorrectCells: [],
  boardJustFinish: false
};
