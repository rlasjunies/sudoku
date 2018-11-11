import * as h from './sudoku';

it('should return the row of a cell number', () => {
  expect(h.rowOfCellNumber(1)).toBe(0);
  expect(h.rowOfCellNumber(5)).toBe(0);
  expect(h.rowOfCellNumber(8)).toBe(0);
  expect(h.rowOfCellNumber(9)).toBe(1);
  expect(h.rowOfCellNumber(10)).toBe(1);
  expect(h.rowOfCellNumber(15)).toBe(1);
  expect(h.rowOfCellNumber(18)).toBe(2);
  expect(h.rowOfCellNumber(19)).toBe(2);
});

it('should return the col of a cell number', () => {
  expect(h.colOfCellNumber(0)).toBe(0);
  expect(h.colOfCellNumber(1)).toBe(1);
  expect(h.colOfCellNumber(5)).toBe(5);
  expect(h.colOfCellNumber(8)).toBe(8);
  expect(h.colOfCellNumber(9)).toBe(0);
  expect(h.colOfCellNumber(10)).toBe(1);
  expect(h.colOfCellNumber(15)).toBe(6);
  expect(h.colOfCellNumber(18)).toBe(0);
});

it('should return the zone of a cell number', () => {
  expect(h.zoneOfCellNumber(0)).toBe(0);
  expect(h.zoneOfCellNumber(1)).toBe(0);
  expect(h.zoneOfCellNumber(5)).toBe(1);
  expect(h.zoneOfCellNumber(8)).toBe(2);
  expect(h.zoneOfCellNumber(9)).toBe(0);
  expect(h.zoneOfCellNumber(10)).toBe(0);
  expect(h.zoneOfCellNumber(15)).toBe(2);
  expect(h.zoneOfCellNumber(18)).toBe(0);
});

it('should return the zone of a cell number', () => {
  expect(h.zoneOfCellNumber(0)).toBe(0);
  expect(h.zoneOfCellNumber(1)).toBe(0);
  expect(h.zoneOfCellNumber(5)).toBe(1);
  expect(h.zoneOfCellNumber(8)).toBe(2);
  expect(h.zoneOfCellNumber(9)).toBe(0);
  expect(h.zoneOfCellNumber(10)).toBe(0);
  expect(h.zoneOfCellNumber(15)).toBe(2);
  expect(h.zoneOfCellNumber(18)).toBe(0);
});

// it('should add value in the baord', () => {

//   const emptySudokuBoard: number[] = Array(81);
//   const resultExpected = [...emptySudokuBoard];
//   resultExpected[0] = 1;
//   expect(h.addNumberInColRow(1, 0, 0, emptySudokuBoard)).toEqual(resultExpected);

//   const resultExpected1 = [...emptySudokuBoard];
//   resultExpected1[9] = 1;
//   expect(h.addNumberInColRow(1, 0, 1, emptySudokuBoard)).toEqual(resultExpected1);

//   const resultExpected2 = [...emptySudokuBoard];
//   resultExpected2[1] = 2;
//   expect(h.addNumberInColRow(2, 1, 0, emptySudokuBoard)).toEqual(resultExpected2);

//   const resultExpected3 = [...emptySudokuBoard];
//   resultExpected3[8] = 9;
//   expect(h.addNumberInColRow(9, 8, 0, emptySudokuBoard)).toEqual(resultExpected3);

//   const resultExpected4 = [...emptySudokuBoard];
//   resultExpected4[9] = 4;
//   expect(h.addNumberInColRow(4, 0, 1, emptySudokuBoard)).toEqual(resultExpected4);

//   const resultExpected5 = [...emptySudokuBoard];
//   resultExpected5[20] = 5;
//   expect(h.addNumberInColRow(5, 2, 2, emptySudokuBoard)).toEqual(resultExpected5);

// });

// it('should verify that a number can be added in a specific columns', () => {
//   const emptySudokuBoard: number[] = Array(81);

//   expect(h.isPossibleCol(1, 0, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 1, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 2, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 3, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 4, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 5, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 6, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 7, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 8, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(1, 0, emptySudokuBoard)).toBeTruthy();

//   expect(h.isPossibleCol(9, 1, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(9, 2, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(9, 3, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(9, 4, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(9, 5, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(9, 6, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(9, 7, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleCol(9, 8, emptySudokuBoard)).toBeTruthy();

//   let someCellAlreadyFilled: number[] = Array(81);
//   someCellAlreadyFilled = h.addNumberInColRow(9, 1, 1, someCellAlreadyFilled);
//   someCellAlreadyFilled = h.addNumberInColRow(5, 2, 1, someCellAlreadyFilled);
//   someCellAlreadyFilled = h.addNumberInColRow(7, 8, 1, someCellAlreadyFilled);

//   // h.visualize(someCellAlreadyFilled);
//   expect(h.isPossibleCol(9, 1, someCellAlreadyFilled)).toBeFalsy();
//   expect(h.isPossibleCol(5, 2, someCellAlreadyFilled)).toBeFalsy();
//   expect(h.isPossibleCol(7, 8, someCellAlreadyFilled)).toBeFalsy();
//   expect(h.isPossibleCol(6, 1, someCellAlreadyFilled)).toBeTruthy();
// });

// it('should verify that arow number can be added in a specific columns', () => {
//   const emptySudokuBoard: number[] = Array(81);

//   expect(h.isPossibleRow(1, 0, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 1, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 2, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 3, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 4, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 5, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 6, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 7, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 8, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(1, 0, emptySudokuBoard)).toBeTruthy();

//   expect(h.isPossibleRow(9, 1, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(9, 2, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(9, 3, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(9, 4, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(9, 5, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(9, 6, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(9, 7, emptySudokuBoard)).toBeTruthy();
//   expect(h.isPossibleRow(9, 8, emptySudokuBoard)).toBeTruthy();

//   let someCellAlreadyFilled: number[] = Array(81);
//   someCellAlreadyFilled = h.addNumberInColRow(9, 1, 1, someCellAlreadyFilled);
//   someCellAlreadyFilled = h.addNumberInColRow(5, 2, 2, someCellAlreadyFilled);
//   someCellAlreadyFilled = h.addNumberInColRow(7, 8, 8, someCellAlreadyFilled);

//   // h.visualize(someCellAlreadyFilled);
//   expect(h.isPossibleRow(9, 1, someCellAlreadyFilled)).toBeFalsy();
//   expect(h.isPossibleRow(5, 2, someCellAlreadyFilled)).toBeFalsy();
//   expect(h.isPossibleRow(7, 8, someCellAlreadyFilled)).toBeFalsy();
//   expect(h.isPossibleRow(6, 1, someCellAlreadyFilled)).toBeTruthy();
// });

// it('', () => {})

// it('should check if we can insert value in a block', () => {

//   let someCellAlreadyFilled: number[] = Array(81);
//   someCellAlreadyFilled = h.addNumberInColRow(9, 1, 1, someCellAlreadyFilled);
//   expect(h.isPossibleBlock(9, 0, someCellAlreadyFilled)).toBeFalsy();
//   expect(h.isPossibleBlock(1, 0, someCellAlreadyFilled)).toBeTruthy();

//   expect(h.isPossibleBlock(9, 1, someCellAlreadyFilled)).toBeTruthy();
// })

it('should list all possible value', () => {
  const emptyBoard: number[] = Array(81);
  const possibleValues = h.determinePossibleValues(0, emptyBoard);
  expect(possibleValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWith1 = Array(81);
  boardWith1[0] = 1;
  const possibleValues1 = h.determinePossibleValues(1,boardWith1);
  expect(possibleValues1).toEqual([2,3,4,5,6,7,8,9]);
});


it('should generate a board',()=>{
  console.time("generate newboard");
  h.generateBoard();
  console.timeEnd("generate newboard");
  expect(true).toBeTruthy();
});

it('should generate an initial sudoku board',()=>{
  const sudokuBoard = h.generateSudokuBoard("easy");
  h.visualize(sudokuBoard);
  expect(true).toBeTruthy();
})

it('should determine possible values of the board',()=>{
  const sudokuBoard = h.generateSudokuBoard("easy");
  h.visualize(sudokuBoard);
  const sudokuBoardWithPossibleValues = h.candidatesForEmptyCells(sudokuBoard);
  h.visualize(sudokuBoardWithPossibleValues);
  expect(true).toBeTruthy();

})
