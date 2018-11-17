import { SudokuLevelType } from "../services/sudoku/sudoku";

export interface SudokuPageState {
  board: number[];
  candidatesBoard: boolean[][];
  boardLevel: SudokuLevelType | null;
  cellSelected: number | null;
  incorrectCells: number[] ;
  boardJustFinish: boolean;
  draftMode:boolean;
}

// const initCandidate = Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,37,38,39,50,51,52,53,54,55,56,57,58,49,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81).map(_ => [true,true,false,true,true,false,,true,false]);
const initCandidate = Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,37,38,39,50,51,52,53,54,55,56,57,58,49,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81).map(_ => [,,,,,,,,]);
// const initCandidate = Array(81);
  
export const sudokuPageInitialState: SudokuPageState = {
  board: Array(81),
  boardLevel: null,
  cellSelected: null,
  incorrectCells: [],
  boardJustFinish: false,
  draftMode: false,
 candidatesBoard: initCandidate
};
