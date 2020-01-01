// import * as h from './sudoku';
// import * as data from "./spec.data";

// // console.log("json loaded",data.board1);

// it('should return the row of a cell number', () => {
//   expect(h.rowOfCellNumber(1)).toBe(0);
//   expect(h.rowOfCellNumber(5)).toBe(0);
//   expect(h.rowOfCellNumber(8)).toBe(0);
//   expect(h.rowOfCellNumber(9)).toBe(1);
//   expect(h.rowOfCellNumber(10)).toBe(1);
//   expect(h.rowOfCellNumber(15)).toBe(1);
//   expect(h.rowOfCellNumber(18)).toBe(2);
//   expect(h.rowOfCellNumber(19)).toBe(2);
// });

// it('should return the col of a cell number', () => {
//   expect(h.colOfCellNumber(0)).toBe(0);
//   expect(h.colOfCellNumber(1)).toBe(1);
//   expect(h.colOfCellNumber(5)).toBe(5);
//   expect(h.colOfCellNumber(8)).toBe(8);
//   expect(h.colOfCellNumber(9)).toBe(0);
//   expect(h.colOfCellNumber(10)).toBe(1);
//   expect(h.colOfCellNumber(15)).toBe(6);
//   expect(h.colOfCellNumber(18)).toBe(0);
// });

// it('should return the block of a cell number', () => {
//   expect(h.blockOfCellNumber(0)).toBe(0);
//   expect(h.blockOfCellNumber(1)).toBe(0);
//   expect(h.blockOfCellNumber(5)).toBe(1);
//   expect(h.blockOfCellNumber(8)).toBe(2);
//   expect(h.blockOfCellNumber(9)).toBe(0);
//   expect(h.blockOfCellNumber(10)).toBe(0);
//   expect(h.blockOfCellNumber(15)).toBe(2);
//   expect(h.blockOfCellNumber(18)).toBe(0);
// });


// // it('should add value in the baord', () => {

// //   const emptySudokuBoard: number[] = Array(81);
// //   const resultExpected = [...emptySudokuBoard];
// //   resultExpected[0] = 1;
// //   expect(h.addNumberInColRow(1, 0, 0, emptySudokuBoard)).toEqual(resultExpected);

// //   const resultExpected1 = [...emptySudokuBoard];
// //   resultExpected1[9] = 1;
// //   expect(h.addNumberInColRow(1, 0, 1, emptySudokuBoard)).toEqual(resultExpected1);

// //   const resultExpected2 = [...emptySudokuBoard];
// //   resultExpected2[1] = 2;
// //   expect(h.addNumberInColRow(2, 1, 0, emptySudokuBoard)).toEqual(resultExpected2);

// //   const resultExpected3 = [...emptySudokuBoard];
// //   resultExpected3[8] = 9;
// //   expect(h.addNumberInColRow(9, 8, 0, emptySudokuBoard)).toEqual(resultExpected3);

// //   const resultExpected4 = [...emptySudokuBoard];
// //   resultExpected4[9] = 4;
// //   expect(h.addNumberInColRow(4, 0, 1, emptySudokuBoard)).toEqual(resultExpected4);

// //   const resultExpected5 = [...emptySudokuBoard];
// //   resultExpected5[20] = 5;
// //   expect(h.addNumberInColRow(5, 2, 2, emptySudokuBoard)).toEqual(resultExpected5);

// // });

// // it('should verify that a number can be added in a specific columns', () => {
// //   const emptySudokuBoard: number[] = Array(81);

// //   expect(h.isPossibleCol(1, 0, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 1, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 2, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 3, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 4, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 5, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 6, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 7, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 8, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(1, 0, emptySudokuBoard)).toBeTruthy();

// //   expect(h.isPossibleCol(9, 1, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(9, 2, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(9, 3, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(9, 4, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(9, 5, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(9, 6, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(9, 7, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleCol(9, 8, emptySudokuBoard)).toBeTruthy();

// //   let someCellAlreadyFilled: number[] = Array(81);
// //   someCellAlreadyFilled = h.addNumberInColRow(9, 1, 1, someCellAlreadyFilled);
// //   someCellAlreadyFilled = h.addNumberInColRow(5, 2, 1, someCellAlreadyFilled);
// //   someCellAlreadyFilled = h.addNumberInColRow(7, 8, 1, someCellAlreadyFilled);

// //   // h.visualize(someCellAlreadyFilled);
// //   expect(h.isPossibleCol(9, 1, someCellAlreadyFilled)).toBeFalsy();
// //   expect(h.isPossibleCol(5, 2, someCellAlreadyFilled)).toBeFalsy();
// //   expect(h.isPossibleCol(7, 8, someCellAlreadyFilled)).toBeFalsy();
// //   expect(h.isPossibleCol(6, 1, someCellAlreadyFilled)).toBeTruthy();
// // });

// // it('should verify that arow number can be added in a specific columns', () => {
// //   const emptySudokuBoard: number[] = Array(81);

// //   expect(h.isPossibleRow(1, 0, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 1, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 2, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 3, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 4, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 5, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 6, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 7, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 8, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(1, 0, emptySudokuBoard)).toBeTruthy();

// //   expect(h.isPossibleRow(9, 1, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(9, 2, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(9, 3, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(9, 4, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(9, 5, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(9, 6, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(9, 7, emptySudokuBoard)).toBeTruthy();
// //   expect(h.isPossibleRow(9, 8, emptySudokuBoard)).toBeTruthy();

// //   let someCellAlreadyFilled: number[] = Array(81);
// //   someCellAlreadyFilled = h.addNumberInColRow(9, 1, 1, someCellAlreadyFilled);
// //   someCellAlreadyFilled = h.addNumberInColRow(5, 2, 2, someCellAlreadyFilled);
// //   someCellAlreadyFilled = h.addNumberInColRow(7, 8, 8, someCellAlreadyFilled);

// //   // h.visualize(someCellAlreadyFilled);
// //   expect(h.isPossibleRow(9, 1, someCellAlreadyFilled)).toBeFalsy();
// //   expect(h.isPossibleRow(5, 2, someCellAlreadyFilled)).toBeFalsy();
// //   expect(h.isPossibleRow(7, 8, someCellAlreadyFilled)).toBeFalsy();
// //   expect(h.isPossibleRow(6, 1, someCellAlreadyFilled)).toBeTruthy();
// // });

// // it('', () => {})

// // it('should check if we can insert value in a block', () => {

// //   let someCellAlreadyFilled: number[] = Array(81);
// //   someCellAlreadyFilled = h.addNumberInColRow(9, 1, 1, someCellAlreadyFilled);
// //   expect(h.isPossibleBlock(9, 0, someCellAlreadyFilled)).toBeFalsy();
// //   expect(h.isPossibleBlock(1, 0, someCellAlreadyFilled)).toBeTruthy();

// //   expect(h.isPossibleBlock(9, 1, someCellAlreadyFilled)).toBeTruthy();
// // })

// it('should list all possible value', () => {
//   const emptyBoard = h.initializeSudokuBoard();
//   const possibleValues = h.determinePossibleValuesx(0, emptyBoard);
//   expect(possibleValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

//   const boardWith1 = h.initializeSudokuBoard();
//   boardWith1.cells[0].value = 1;
//   const possibleValues1 = h.determinePossibleValuesx(1, boardWith1);
//   expect(possibleValues1).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
// });

// it('should generate a board', () => {
//   console.time("generate newboard");
//   h.generateBoard();
//   console.timeEnd("generate newboard");
//   expect(true).toBeTruthy();
// });

// it('should generate an initial sudoku board', () => {
//   const sudokuBoard = h.generateSudokuBoard("easy");
//   h.visualize(sudokuBoard);
//   expect(true).toBeTruthy();
// })

// it('should resolve a board', () => {
//   const initialBoard = data.board1;
//   h.visualize(initialBoard, "board1");

//   const resolveResult = h.resolverWorkForce(0, initialBoard);
//   h.visualize(resolveResult.board);

//   expect(resolveResult.resolved).toBeTruthy();
// })

// it('should return the cell number of a block', () => {

//   // block #1
//   expect(h.cellNumberOfColRowOfBlock(0, 0, 0)).toBe(0);
//   expect(h.cellNumberOfColRowOfBlock(1, 0, 0)).toBe(1);
//   expect(h.cellNumberOfColRowOfBlock(2, 0, 0)).toBe(2);
//   expect(h.cellNumberOfColRowOfBlock(0, 1, 0)).toBe(9);
//   expect(h.cellNumberOfColRowOfBlock(1, 1, 0)).toBe(10);
//   expect(h.cellNumberOfColRowOfBlock(2, 1, 0)).toBe(11);
//   expect(h.cellNumberOfColRowOfBlock(0, 2, 0)).toBe(18);
//   expect(h.cellNumberOfColRowOfBlock(1, 2, 0)).toBe(19);
//   expect(h.cellNumberOfColRowOfBlock(2, 2, 0)).toBe(20);

//   // block #2
//   expect(h.cellNumberOfColRowOfBlock(0, 0, 1)).toBe(3);
//   expect(h.cellNumberOfColRowOfBlock(1, 0, 1)).toBe(4);
//   expect(h.cellNumberOfColRowOfBlock(2, 0, 1)).toBe(5);
//   expect(h.cellNumberOfColRowOfBlock(0, 1, 1)).toBe(12);
//   expect(h.cellNumberOfColRowOfBlock(1, 1, 1)).toBe(13);
//   expect(h.cellNumberOfColRowOfBlock(2, 1, 1)).toBe(14);
//   expect(h.cellNumberOfColRowOfBlock(0, 2, 1)).toBe(21);
//   expect(h.cellNumberOfColRowOfBlock(1, 2, 1)).toBe(22);
//   expect(h.cellNumberOfColRowOfBlock(2, 2, 1)).toBe(23);

//   // block #3
//   expect(h.cellNumberOfColRowOfBlock(0, 0, 2)).toBe(6);
//   expect(h.cellNumberOfColRowOfBlock(1, 0, 2)).toBe(7);
//   expect(h.cellNumberOfColRowOfBlock(2, 0, 2)).toBe(8);
//   expect(h.cellNumberOfColRowOfBlock(0, 1, 2)).toBe(15);
//   expect(h.cellNumberOfColRowOfBlock(1, 1, 2)).toBe(16);
//   expect(h.cellNumberOfColRowOfBlock(2, 1, 2)).toBe(17);
//   expect(h.cellNumberOfColRowOfBlock(0, 2, 2)).toBe(24);
//   expect(h.cellNumberOfColRowOfBlock(1, 2, 2)).toBe(25);
//   expect(h.cellNumberOfColRowOfBlock(2, 2, 2)).toBe(26);

//   // block #4
//   expect(h.cellNumberOfColRowOfBlock(0, 0, 3)).toBe(27);
//   expect(h.cellNumberOfColRowOfBlock(1, 0, 3)).toBe(28);
//   expect(h.cellNumberOfColRowOfBlock(2, 0, 3)).toBe(29);
//   expect(h.cellNumberOfColRowOfBlock(0, 1, 3)).toBe(36);
//   expect(h.cellNumberOfColRowOfBlock(1, 1, 3)).toBe(37);
//   expect(h.cellNumberOfColRowOfBlock(2, 1, 3)).toBe(38);
//   expect(h.cellNumberOfColRowOfBlock(0, 2, 3)).toBe(45);
//   expect(h.cellNumberOfColRowOfBlock(1, 2, 3)).toBe(46);
//   expect(h.cellNumberOfColRowOfBlock(2, 2, 3)).toBe(47);

//   // block #5
//   expect(h.cellNumberOfColRowOfBlock(0, 0, 4)).toBe(30);
//   expect(h.cellNumberOfColRowOfBlock(1, 0, 4)).toBe(31);
//   expect(h.cellNumberOfColRowOfBlock(2, 0, 4)).toBe(32);
//   expect(h.cellNumberOfColRowOfBlock(0, 1, 4)).toBe(39);
//   expect(h.cellNumberOfColRowOfBlock(1, 1, 4)).toBe(40);
//   expect(h.cellNumberOfColRowOfBlock(2, 1, 4)).toBe(41);
//   expect(h.cellNumberOfColRowOfBlock(0, 2, 4)).toBe(48);
//   expect(h.cellNumberOfColRowOfBlock(1, 2, 4)).toBe(49);
//   expect(h.cellNumberOfColRowOfBlock(2, 2, 4)).toBe(50);

//   // block #7
//   expect(h.cellNumberOfColRowOfBlock(0, 0, 6)).toBe(54);
//   expect(h.cellNumberOfColRowOfBlock(1, 0, 6)).toBe(55);
//   expect(h.cellNumberOfColRowOfBlock(2, 0, 6)).toBe(56);
//   expect(h.cellNumberOfColRowOfBlock(0, 1, 6)).toBe(63);
//   expect(h.cellNumberOfColRowOfBlock(1, 1, 6)).toBe(64);
//   expect(h.cellNumberOfColRowOfBlock(2, 1, 6)).toBe(65);
//   expect(h.cellNumberOfColRowOfBlock(0, 2, 6)).toBe(72);
//   expect(h.cellNumberOfColRowOfBlock(1, 2, 6)).toBe(73);
//   expect(h.cellNumberOfColRowOfBlock(2, 2, 6)).toBe(74);
// })