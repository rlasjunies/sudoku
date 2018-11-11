import * as arrayShuffle from "../arrayShuffle";

export function rowOfCellNumber(cellNumber: number) {
    return Math.floor(cellNumber / 9);
}

export function colOfCellNumber(cellNumber: number) {
    return cellNumber % 9;
}

export function zoneOfCellNumber(cellNumber: number) {
    return Math.floor(rowOfCellNumber(cellNumber) / 3) * 3 + Math.floor(colOfCellNumber(cellNumber) / 3);
}

export function visualize(board: number[]) {
    let clone = [...board];
    let boardToWrite: string;

    boardToWrite = "*******************\n";
    for (let lineCounter = 0; lineCounter < 9; lineCounter++) {
        const boardLine = clone.splice(0, 9);
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

    function replaceNullBySpace(): (value: number) => number | " " {
        return value => {
            if (value == null)
                return " ";
            return value;
        };
    }
}

// export function addNumberInColRow(number: number, col: number, row: number, board: number[]): number[] {
//     let temp = [...board];
//     temp[col + row * 9] = number;
//     return temp;
// }


export function updateBoard(number: number, cell: number, board: number[]): number[] {
    let temp = [...board];
    temp[cell] = number;
    return temp;
}

export function isPossibleRow(number: number, row: number, board: number[]) {
    for (var i = 0; i <= 8; i++) {
        if (board[row * 9 + i] == number) {
            return false;
        }
    }
    return true;
}

export function isPossibleCol(number: number, col: number, sudoku: number[]) {
    for (var i = 0; i <= 8; i++) {
        if (sudoku[col + 9 * i] == number) {
            return false;
        }
    }
    return true;
}

export function isPossibleBlock(number: number, block: number, sudoku: number[]) {
    for (var i = 0; i <= 8; i++) {
        if (sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)] == number) {
            return false;
        }
    }
    return true;
}

export function isPossibleNumber(cell: number, number: number, board: number[]) {
    var row = rowOfCellNumber(cell);
    var col = colOfCellNumber(cell);
    var block = zoneOfCellNumber(cell);
    return isPossibleRow(number, row, board) && isPossibleCol(number, col, board) && isPossibleBlock(number, block, board);
}

// export function isCorrectRow(row: number, sudoku: number[]) {
//     var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
//     var rowTemp = new Array();
//     for (var i = 0; i <= 8; i++) {
//         rowTemp[i] = sudoku[row * 9 + i];
//     }
//     rowTemp.sort();
//     return rowTemp.join() == rightSequence.join();
// }

// export function isCorrectCol(col: number, sudoku: number[]) {
//     var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
//     var colTemp = new Array();
//     for (var i = 0; i <= 8; i++) {
//         colTemp[i] = sudoku[col + i * 9];
//     }
//     colTemp.sort();
//     return colTemp.join() == rightSequence.join();
// }

// export function isCorrectBlock(block: number, sudoku: number[]) {
//     var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
//     var blockTemp = new Array();
//     for (var i = 0; i <= 8; i++) {
//         blockTemp[i] = sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)];
//     }
//     blockTemp.sort();
//     return blockTemp.join() == rightSequence.join();
// }

// export function isSolvedSudoku(sudoku: number[]) {
//     for (var i = 0; i <= 8; i++) {
//         if (!isCorrectBlock(i, sudoku) || !isCorrectRow(i, sudoku) || !isCorrectCol(i, sudoku)) {
//             return false;
//         }
//     }
//     return true;
// }

export function determinePossibleValues(cell: number, board: number[]) {
    var possible = new Array();
    for (var i = 1; i <= 9; i++) {
        if (isPossibleNumber(cell, i, board)) {
            possible.push(i);
        }
    }
    return possible;
}

export function generateBoard():number[] {
    const emptyBoard = new Array(81);

    const { board } = generateBoardFromCell(0, emptyBoard);
    // visualize(board);
    return board;
}

function generateBoardFromCell(cell: number, board: number[]) {
    const possibleValuesShuffled = arrayShuffle.knuthfisheryates2<number>(determinePossibleValues(cell, board));

    // console.log(`cell[${cell}]=[${possibleValuesShuffled.join(",")}]`);

    // iterate all possible valeu looking for a finish
    for (let index = 0; index < possibleValuesShuffled.length; index++) {
        const possibleValue = possibleValuesShuffled[index];

        const nextBoard: number[] = [...board];
        nextBoard[cell] = possibleValue;
        // visualize(nextBoard);
 
        const nextCell = cell + 1;
        if (nextCell === board.length) {
            //console.log({ board: nextBoard, finish: true, deadEnd: false })
            return { board: nextBoard, finish: true, deadEnd: false };
        }

        const { board: finishedBoard, finish } = generateBoardFromCell(nextCell, nextBoard);
        if (finish) {
            return { board: finishedBoard, finish: true, deadEnd: false };
        }
   }

    // all cell values are wrong
    return { board: null, finish: false, daedEnd: true };
}

export type SudokuLevelType =  "easy"| "normal" | "complex";

export function generateSudokuBoard(level: SudokuLevelType):number[] {
    const solvedBoard = generateBoard();
    const sudokuBoard = [...solvedBoard];
    // "easy":         62
    // "medium":       53
    // "hard":         44
    // "very-hard":    35
    // "insane":       26
    // "inhuman":      17
    let numberOfComplexity:number;

    switch(level) {
        case "easy":
            numberOfComplexity = (81-62);
        case "normal":
            numberOfComplexity = (81-53);
        case "complex":
            numberOfComplexity = (81-44);
    }

    const indexCellsToHide = Array(81);
    for (let index = 0; index < indexCellsToHide.length; index++) {
        indexCellsToHide[index] = index + 1;
    }
    
    const cellsToHide = arrayShuffle.knuthfisheryates2(indexCellsToHide);
    for( let index = 0;index < numberOfComplexity; index++){
        sudokuBoard[cellsToHide[index]] = undefined;
    }

    // TODO evaluate the complexity to solve
    return sudokuBoard;
}

export function candidatesForEmptyCells(board:any[]){
    const result = Array(81);
    for (let cell = 0; cell < result.length; cell++) {
        const cellValue = result[cell];
        if ( cellValue !== undefined){
            // pass
        } else {
            result[cell] = ">" + determinePossibleValues(cell,board).join(",") + "<";
        }
    }
    return result;
}