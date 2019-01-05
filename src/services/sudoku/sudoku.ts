import * as arrayShuffle from "../arrayShuffle";

export interface SudokuBoard {
    cells: SudokuBoardCell[];
    incorrectCells: number[];
    remainingNumbers: number[];
}
export interface SudokuBoardCell {
    value: number | null;
    candidates: boolean[];
    seed: boolean;
    expectedValue: number;
}
const EMPTYCELL: SudokuBoardCell = {
    value: null,
    candidates: [, , , , , , , ,],
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

export function blockOfColRow(col: number, row: number) {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

export function visualize(board: SudokuBoard) {
    let clone = { ...board };
    let boardToWrite: string;

    boardToWrite = "*******************\n";
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

export function removeCandidateBoard(board: SudokuBoard, value: number, cellNumber: number): SudokuBoard {
    const newBoard = sudokuBoardClone(board);

    var row = rowOfCellNumber(cellNumber);
    var col = colOfCellNumber(cellNumber);
    var block = blockOfCellNumber(cellNumber);

    removeCandidateRow(value, row, newBoard);
    removeCandidateCol(value, col, newBoard);
    removeCandidateBlock(value, block, newBoard);

    return newBoard;

    function removeCandidateRow(value: number, row: number, board: SudokuBoard) {
        for (var i = 0; i <= 8; i++) {
            board.cells[row * 9 + i].candidates = removeCandidate(value, board.cells[row * 9 + i].candidates)
        }
    }

    function removeCandidateCol(value: number, col: number, board: SudokuBoard) {
        for (var i = 0; i <= 8; i++) {
            board.cells[col + 9 * i].candidates = removeCandidate(value, board.cells[col + 9 * i].candidates);
        }
    }

    function removeCandidateBlock(value: number, block: number, board: SudokuBoard) {
        for (var i = 0; i <= 8; i++) {
            board.cells[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)].candidates = removeCandidate(value, board.cells[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)].candidates);
        }
    }
    function removeCandidate(value: number, candidates: boolean[]): boolean[] {
        if (candidates[value - 1]) {
            candidates[value - 1] = false;
        }
        return candidates;
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

        console.log(`resolverWorkForce: xxxxxxxxxxxxxxxxxxxxxxxxx !!! no possible value dead end: cell:${cellNumber}`, board)
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
            numberOfComplexity = (81 - 62);
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

    // creation of an array of number
    const indexCellsToHide = Array(81);
    for (let index = 0; index < indexCellsToHide.length; index++) {
        indexCellsToHide[index] = index + 1;
    }

    // let's shuffled the array of number 
    const cellsToHide = arrayShuffle.knuthfisheryates2(indexCellsToHide);

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

// calculate the number of each numbers in cell
// this is used to hide key when the a specific number has been used 9th times
export function remainingNumbers(sudokuBoardCells: SudokuBoardCell[]) {

    const init = [9, 9, 9, 9, 9, 9, 9, 9, 9];
    return sudokuBoardCells.reduce<number[]>((tmp, cell, _, __) => {
        tmp[cell.value - 1] -= 1;
        return tmp;

    }, init);
}

// export function candidatesForEmptyCells(board: SudokuBoard): number[] {
//     const result = Array(81);
//     for (let cell = 0; cell < result.length; cell++) {
//         // const cellValue = result[cell]; //???? stange algo expecting to check the board not result to delete if new algo confirmed
//         const cellValue = board.cells[cell];
//         if (cellValue !== undefined) {
//             // pass
//         } else {
//             result[cell] = ">" + determinePossibleValuesx(cell, board).join(",") + "<";
//         }
//     }
//     return result;
// }