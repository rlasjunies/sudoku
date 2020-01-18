import * as arrayShuffle from "../arrayShuffle";
import { testEnvironment } from "../../global/global";
const DEV_MODE = ['%c[sudoku.ts]', 'color:#ff11ff;font-weight: bold'];

export interface Solution {
    cell: number;
    value: number
}
export interface SolutionsByRules {
    uniquePossibleValue: Solution[];
    uniqueOccurenceInZones: Solution[];
}
export interface SudokuWizardConfiguration {
    calculatePossibleValues: boolean;
    showUniquePossibleValueInRowOrColumn: boolean;
    showUniquePossiblrValueInZones: boolean;
}
export const sudokuWizardConfigurationInit: SudokuWizardConfiguration = {
    calculatePossibleValues: false,
    showUniquePossibleValueInRowOrColumn: false,
    showUniquePossiblrValueInZones: false
}

export interface SudokuBoard {
    cells: SudokuBoardCell[];
    incorrectCells: number[];
    remainingNumbers: number[];
}
export interface SudokuBoardCell {
    value: number | null;
    drafted: boolean[];
    calculatedPossibleValues: number[];
    seed: boolean;
    expectedValue: number;
}
const EMPTYCELL: SudokuBoardCell = {
    value: null,
    drafted: [, , , , , , , ,],
    calculatedPossibleValues: [],
    seed: false,
    expectedValue: null
}

export function initializeSudokuBoard(): SudokuBoard {
    const board: SudokuBoard = {
        cells: [],
        incorrectCells: [],
        remainingNumbers: []
    }
    for (let index = 0; index < 81; index++) {
        board.cells[index] = { ...EMPTYCELL };
    }
    return board;
}

export function rowOfCellNumber(cellNumber: number) {
    return Math.floor(cellNumber / 9);
}

export function colOfCellNumber(cellNumber: number) {
    return cellNumber % 9;
}

export function blockOfCellNumber(cellNumber: number) {
    return Math.floor(rowOfCellNumber(cellNumber) / 3) * 3 + Math.floor(colOfCellNumber(cellNumber) / 3);
}

export function cellNumberOfColRowOfBlock(col: number, row: number, block: number) {
    return (col + (block % 3) * 3) + ((row * 9) + (27 * Math.floor(block / 3)));
}
export function cellsNumberOfTheBlock(block: number): number[] {

    return [
        cellNumberOfColRowOfBlock(0, 0, block),
        cellNumberOfColRowOfBlock(1, 0, block),
        cellNumberOfColRowOfBlock(2, 0, block),
        cellNumberOfColRowOfBlock(0, 1, block),
        cellNumberOfColRowOfBlock(1, 1, block),
        cellNumberOfColRowOfBlock(2, 1, block),
        cellNumberOfColRowOfBlock(0, 2, block),
        cellNumberOfColRowOfBlock(1, 2, block),
        cellNumberOfColRowOfBlock(2, 2, block)
    ];


}

export function blockOfColRow(col: number, row: number) {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

export function visualize(board: SudokuBoard, name?: string) {
    let clone = { ...board };
    let boardToWrite: string;

    boardToWrite = "*******************\n";
    boardToWrite += "* " + name + "\n";
    boardToWrite += "*******************\n";
    for (let lineCounter = 0; lineCounter < 9; lineCounter++) {
        const boardLine = clone.cells.splice(0, 9);
        const boardLineWithSpace = boardLine.map(replaceNullBySpace())
        if (lineCounter != 0 && lineCounter % 3 == 0)
            boardToWrite += "*-----------------*\n";
        boardToWrite += "*" +
            boardLineWithSpace.splice(0, 3).join(":") + "|" +
            boardLineWithSpace.splice(0, 3).join(":") + "|" +
            boardLineWithSpace.splice(0, 3).join(":") +
            "*\n";
    }
    boardToWrite += "*******************\n";
    console.log(boardToWrite);

    function replaceNullBySpace(): (cell: SudokuBoardCell) => number | " " {
        return cell => {
            if (cell.value == null)
                return " ";
            return cell.value;
        };
    }
}

export function isPossibleRowx(number: number, row: number, board: SudokuBoard) {
    for (var i = 0; i <= 8; i++) {
        if (board.cells[row * 9 + i].value == number) {
            return false;
        }
    }
    return true;
}


export function isPossibleColx(cellValue: number, col: number, board: SudokuBoard) {
    for (var i = 0; i <= 8; i++) {
        if (board.cells[col + 9 * i].value == cellValue) {
            return false;
        }
    }
    return true;
}

export function isPossibleBlockx(cellValue: number, block: number, board: SudokuBoard) {
    for (var i = 0; i <= 8; i++) {
        if (board.cells[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)].value == cellValue) {
            return false;
        }
    }
    return true;
}

export function isPossibleNumberx(cellNumber: number, cellValue: number, board: SudokuBoard) {
    var row = rowOfCellNumber(cellNumber);
    var col = colOfCellNumber(cellNumber);
    var block = blockOfCellNumber(cellNumber);
    return isPossibleRowx(cellValue, row, board) && isPossibleColx(cellValue, col, board) && isPossibleBlockx(cellValue, block, board);
}

export function isRowSolvedx(row: number, board: SudokuBoard) {
    var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    var rowTemp = new Array();
    for (var i = 0; i <= 8; i++) {
        rowTemp[i] = board.cells[row * 9 + i].value;
    }
    rowTemp.sort();
    return rowTemp.join() == rightSequence.join();
}


export function isColSolvedx(col: number, board: SudokuBoard) {
    var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    var colTemp = new Array();
    for (var i = 0; i <= 8; i++) {
        colTemp[i] = board.cells[col + i * 9].value;
    }
    colTemp.sort();
    return colTemp.join() == rightSequence.join();
}


export function isBlockSolvedx(block: number, board: SudokuBoard) {
    var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    var blockTemp = new Array();
    for (var i = 0; i <= 8; i++) {
        blockTemp[i] = board.cells[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)].value;
    }
    blockTemp.sort();
    return blockTemp.join() == rightSequence.join();
}


export function isBoardSolvedx(board: SudokuBoard) {
    for (var i = 0; i <= 8; i++) {
        if (!isBlockSolvedx(i, board) || !isRowSolvedx(i, board) || !isColSolvedx(i, board)) {
            return false;
        }
    }
    return true;
}

export function determinePossibleValuesx(cellNumber: number, board: SudokuBoard): number[] {
    var possible = new Array();
    for (var i = 1; i <= 9; i++) {
        if (isPossibleNumberx(cellNumber, i, board)) {
            possible.push(i);
        }
    }
    return possible;
}

export function removeDraftedValueInZone(board: SudokuBoard, value: number, cellNumber: number): SudokuBoard {
    const newBoard = sudokuBoardClone(board);

    var row = rowOfCellNumber(cellNumber);
    var col = colOfCellNumber(cellNumber);
    var block = blockOfCellNumber(cellNumber);

    removeDraftedValueInRow(value, row, newBoard);
    removeDraftedValueInCol(value, col, newBoard);
    removeDraftedValueInBlock(value, block, newBoard);

    return newBoard;

    function removeDraftedValueInRow(value: number, row: number, board: SudokuBoard) {
        for (var i = 0; i <= 8; i++) {
            board.cells[row * 9 + i].drafted = removeDraftedValue(value, board.cells[row * 9 + i].drafted)
        }
    }

    function removeDraftedValueInCol(value: number, col: number, board: SudokuBoard) {
        for (var i = 0; i <= 8; i++) {
            board.cells[col + 9 * i].drafted = removeDraftedValue(value, board.cells[col + 9 * i].drafted);
        }
    }

    function removeDraftedValueInBlock(value: number, block: number, board: SudokuBoard) {
        for (var i = 0; i <= 8; i++) {
            board.cells[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)].drafted = removeDraftedValue(value, board.cells[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)].drafted);
        }
    }
    function removeDraftedValue(value: number, draftedValues: boolean[]): boolean[] {
        if (draftedValues[value - 1]) {
            draftedValues[value - 1] = false;
        }
        return draftedValues;
    }
}

export function generateBoard(): SudokuBoard {
    const emptyBoard = initializeSudokuBoard();

    const { board } = generateBoardFromCell(0, emptyBoard);
    // visualize(board);

    return board;
}

export function sudokuBoardClone(src: SudokuBoard): SudokuBoard {
    return JSON.parse(JSON.stringify(src));
}

function generateBoardFromCell(cellNumber: number, board: SudokuBoard) {
    const possibleValuesShuffled = arrayShuffle.knuthfisheryates2<number>(determinePossibleValuesx(cellNumber, board));

    for (let index = 0; index < possibleValuesShuffled.length; index++) {
        let nextBoard = sudokuBoardClone(board);

        nextBoard.cells[cellNumber].value = possibleValuesShuffled[index];
        nextBoard.cells[cellNumber].expectedValue = nextBoard.cells[cellNumber].value;
        nextBoard.cells[cellNumber].seed = true;

        const nextCellNumber = cellNumber + 1;
        if (nextCellNumber === board.cells.length) {
            return { board: nextBoard, finish: true, deadEnd: false };
        }

        const { board: finishedBoard, finish, deadEnd } = generateBoardFromCell(nextCellNumber, nextBoard);
        if (finish) {
            return { board: finishedBoard, finish: true, deadEnd: deadEnd };
        }
    }

    // all cell values are wrong
    return { board: null, finish: false, deadEnd: true };
}

export function resolverWorkForce(cellNumber: number, board: SudokuBoard) {

    // console.log(`resolverWorkForce: cell:${cellNumber}`);
    // sortir de la recurrence
    if (cellNumber >= board.cells.length) {
        return { board: board, finish: true, resolved: true };
    }

    if (board.cells[cellNumber].value !== null) {
        // the cell is already filled we continue recurrence
        // console.log(`resolverWorkForce: ALREADY FILLED - cell:${cellNumber} - value:${board.cells[cellNumber].value}`);
        return resolverWorkForce(cellNumber + 1, board);
    } else {
        // console.log(`resolverWorkForce: NO VALUE DEFINED cell:${cellNumber} - value:${board.cells[cellNumber].value}`);

        // liste of potential values for the cell
        const possibleValuesShuffled = arrayShuffle.knuthfisheryates2<number>(determinePossibleValuesx(cellNumber, board));

        // parse all the potential values
        for (let index = 0; index < possibleValuesShuffled.length; index++) {
            let nextBoard = sudokuBoardClone(board);

            nextBoard.cells[cellNumber].value = possibleValuesShuffled[index];

            // console.log(`resolverWorkForce: PROPOSE VALUE cell:${cellNumber} - value:${nextBoard.cells[cellNumber].value}`);

            const { board: finishedBoard, finish, resolved } = resolverWorkForce(cellNumber + 1, nextBoard);
            if (finish) {
                return { board: finishedBoard, finish: finish, resolved: resolved };
            }
        }

        // console.log(`resolverWorkForce: xxxxxxxxxxxxxxxxxxxxxxxxx !!! no possible value dead end: cell:${cellNumber}`, board)
        // all cell values are wrong
        return { board: null, finish: false, resolved: false };
    }
}

export type SudokuLevelType = "easy" | "medium" | "complex" | "very complex";

export function generateSudokuBoard(level: SudokuLevelType): SudokuBoard {
    const solvedBoard = generateBoard();
    const sudokuBoard = { ...solvedBoard };
    // "easy":         62
    // "medium":       53
    // "hard":         44
    // "very-hard":    35
    // "insane":       26
    // "inhuman":      17
    let numberOfComplexity: number;

    switch (level) {
        case "easy":
            if (testEnvironment) { numberOfComplexity = 81 - 78 }
            else {
                numberOfComplexity = (81 - 62);
            }
            break;
        case "medium":
            numberOfComplexity = (81 - 53);
            break;
        case "complex":
            numberOfComplexity = (81 - 44);
            break;
        case "very complex":
            numberOfComplexity = (81 - 35);
            break;
    }

    // let's shuffled the array of number 
    const cellsToHide = computeCellsToHide(numberOfComplexity);

    // for the complexity define, use this array shuffled to "remove" the values of the cells
    for (let index = 0; index < numberOfComplexity; index++) {
        const cellToHide = cellsToHide[index] - 1;
        // console.log(`index:${index} - cellsToHide[${index}]: ${cellToHide}`);
        // console.log(`index:${index} - cellsToHide[${index}]: ${cellToHide} - sudokuBoard.cells[index].expectedValue:${sudokuBoard.cells[cellToHide].expectedValue} `);
        sudokuBoard.cells[cellToHide] = { ...EMPTYCELL, expectedValue: sudokuBoard.cells[cellToHide].expectedValue };
    }

    // update the remaining number of numbers
    sudokuBoard.remainingNumbers = remainingNumbers(sudokuBoard.cells);

    // TODO evaluate the complexity to solve
    return sudokuBoard;
}

export function computeCellsToHide(numberOfComplexity: number) {
    // creation of an array of number
    const indexCellsToHide = Array(81);
    for (let index = 0; index < indexCellsToHide.length; index++) {
        indexCellsToHide[index] = index + 1;
    }
    const cellsToHide = arrayShuffle.knuthfisheryates2(indexCellsToHide);

    let rowsRemainingValues: number[] = [9, 9, 9, 9, 9, 9, 9, 9, 9];
    let colsRemainingValues: number[] = [9, 9, 9, 9, 9, 9, 9, 9, 9];
    for (let index = 0; index < numberOfComplexity; index++) {
        const cellToHide = cellsToHide[index] - 1;
        rowsRemainingValues[rowOfCellNumber(cellToHide)] -= 1;
        colsRemainingValues[colOfCellNumber(cellToHide)] -= 1;
    }
    if (rowsRemainingValues.find(value => value === 0) === 0 ||
        colsRemainingValues.find(value => value === 0) === 0) {
        // testEnvironment && console.debug(...DEV_MODE, rowsRemainingValues);
        // testEnvironment && console.debug(...DEV_MODE, colsRemainingValues);
        testEnvironment && console.debug(...DEV_MODE, `board WITHOUT rows or cols let's try again`);
        // debugger;
        return computeCellsToHide(numberOfComplexity);
    } // else {
    //    testEnvironment && console.debug(...DEV_MODE, `!!!!board ok `);
    //     testEnvironment && console.debug(...DEV_MODE, rowsRemainingValues);
    //     testEnvironment && console.debug(...DEV_MODE, colsRemainingValues);
    //}

    return cellsToHide;
}

// calculate the number of each numbers in cell
// this is used to hide key when the a specific number has been used 9th times
export function remainingNumbers(sudokuBoardCells: SudokuBoardCell[]) {

    const init = [9, 9, 9, 9, 9, 9, 9, 9, 9];
    return sudokuBoardCells.reduce<number[]>((tmp, cell, _, __) => {
        tmp[cell.value - 1] -= 1;
        return tmp;

    }, init);
}

/**
 * looks for solution of each empty cell in the board
 * based on rules
 * 
 * @param board 
 */
export function resolveByRules(board: SudokuBoard) {

    // calculate the possibleValues of all the cells
    const boardWithPossibleValues = possibleValues(board);

    // rule#1: unique possible value
    const cellsWithUniquePossibleValue = rule1_cellsWithUniquePossibleValueParser(boardWithPossibleValues);

    // rule#2.1: unique occurence of possible value in the cell row
    // rule#2.2: unique occurence of possible value in the cell column
    // rule#2.3: unique occurence of possible value in the cell block

    const uniqueOcurrenceOfPossibleValueInZones = rule2_cellsWithUniqueOccurenceOfPossibleValueInCellZones(boardWithPossibleValues);

    // rule#3: unique possibility of value in 3 lines or rows

    return {
        uniquePossibleValue: cellsWithUniquePossibleValue,
        uniqueOccurenceInZones: uniqueOcurrenceOfPossibleValueInZones
    }

    function rule1_cellsWithUniquePossibleValueParser(board: SudokuBoard) {
        // the board should already have the uniquePossibleValuesParsed
        let uniquePossibleValues = [];
        for (let index = 0; index < board.cells.length; index++) {
            if (board.cells[index].calculatedPossibleValues.length === 1) {
                const possibleValue = board.cells[index].calculatedPossibleValues[0];
                // console.log(`cell:${index} unique solution:${possibleValue}}`);
                uniquePossibleValues.push({ cell: index, value: possibleValue });
            }
        }
        return uniquePossibleValues;
    }
    function rule2_cellsWithUniqueOccurenceOfPossibleValueInCellZones(board: SudokuBoard) {
        let uniqueOcurrenceOfPossibleValue = [];
        for (let cellIndex = 0; cellIndex < board.cells.length; cellIndex++) {
            // for each possible value
            // only if there no in the case uniquePossibleValue
            if (board.cells[cellIndex].calculatedPossibleValues.length > 1) {
                for (const possibleValue of board.cells[cellIndex].calculatedPossibleValues) {
                    // is this value in another zone
                    // yes, continue it's not unique
                    // no, add in the rule solution
                    const uniqueOccurenceInARow = (1 === numberOfOccurenceInCalculatedPossibleValuesInRow(board, cellIndex, possibleValue));
                    if (uniqueOccurenceInARow) {
                        // console.log(`21 - Unique occurence in a row ${cellIndex} - value:${possibleValue}`);
                        uniqueOcurrenceOfPossibleValue.push({ cell: cellIndex, value: possibleValue });
                    }

                    const uniqueOccurenceInACol = (1 === numberOfOccurenceInCalculatedPossibleValuesInCol(board, cellIndex, possibleValue));
                    if (uniqueOccurenceInACol) {
                        // console.log(`22 - Unique occurence in a col ${cellIndex} - value:${possibleValue}`);
                        uniqueOcurrenceOfPossibleValue.push({ cell: cellIndex, value: possibleValue });
                    }

                    const uniqueOccurenceInABlock = (1 === numberOfOccurenceInCalculatedPossibleValuesInBlock(board, cellIndex, possibleValue));
                    if (uniqueOccurenceInABlock) {
                        // console.log(`23 - Unique occurence in a block ${blockOfCellNumber(cellIndex)} - value:${possibleValue}`);
                        uniqueOcurrenceOfPossibleValue.push({ cell: cellIndex, value: possibleValue });
                    }
                }
            }
        }
        return uniqueOcurrenceOfPossibleValue;
    }


}

export function possibleValues(board: SudokuBoard) {
    let boardWithPossibleValues = sudokuBoardClone(board);

    for (let index = 0; index < boardWithPossibleValues.cells.length; index++) {
        if (boardWithPossibleValues.cells[index].value === null) {
            const possibleValue = determinePossibleValuesx(index, boardWithPossibleValues);
            boardWithPossibleValues.cells[index].calculatedPossibleValues = possibleValue;
        } else {
            boardWithPossibleValues.cells[index].calculatedPossibleValues = [];
        }
    }

    return boardWithPossibleValues
}

function numberOfOccurenceInCalculatedPossibleValuesInRow(board: SudokuBoard, cellNumber: number, possibleValue: number) {
    const row = rowOfCellNumber(cellNumber);
    let numberOfOccurence: number = 0;

    // for each column of the row
    // is the the possibleValue in the possibleValues?
    for (let colIndex = 0; colIndex < 9; colIndex++) {
        incrementNumberOfOccurenceIfItsPossibleValue(cell(colIndex));
    }

    return numberOfOccurence;

    function cell(colIndex: number) {
        return board.cells[row * 9 + colIndex];
    }

    function incrementNumberOfOccurenceIfItsPossibleValue(cell: SudokuBoardCell) {
        if (cell.calculatedPossibleValues.find(possibleValueOfThecell => possibleValueOfThecell === possibleValue)) {
            numberOfOccurence += 1;
        }
    }
}

function numberOfOccurenceInCalculatedPossibleValuesInCol(board: SudokuBoard, cellNumber: number, possibleValue: number) {
    const col = colOfCellNumber(cellNumber);
    let numberOfOccurence: number = 0;

    // for each column of the row
    // is the the possibleValue in the possibleValues?
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        incrementNumberOfOccurenceIfItsPossibleValue(cell(rowIndex));
    }

    return numberOfOccurence;

    function cell(row: number) {
        return board.cells[row * 9 + col];
    }

    function incrementNumberOfOccurenceIfItsPossibleValue(cell: SudokuBoardCell) {
        if (cell.calculatedPossibleValues.find(possibleValueOfThecell => possibleValueOfThecell === possibleValue)) {
            numberOfOccurence += 1;
        }
    }
}

function numberOfOccurenceInCalculatedPossibleValuesInBlock(board: SudokuBoard, cellNumber: number, possibleValue: number) {
    const block = blockOfCellNumber(cellNumber);
    let numberOfOccurence: number = 0;

    // for each cells in the block
    // is the the possibleValue in the possibleValues?
    cellsNumberOfTheBlock(block).forEach(cellNumber => {
        incrementNumberOfOccurenceIfItsPossibleValue(board.cells[cellNumber]);
    });

    return numberOfOccurence;

    function incrementNumberOfOccurenceIfItsPossibleValue(cell: SudokuBoardCell) {
        if (cell.calculatedPossibleValues.find(possibleValueOfThecell => possibleValueOfThecell === possibleValue)) {
            numberOfOccurence += 1;
        }
    }
}