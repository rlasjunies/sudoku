import { testEnvironment } from "../../global/global";

import { Component, EventEmitter, Event, Element, Prop, Watch, h } from '@stencil/core';
import { colOfCellNumber, rowOfCellNumber, blockOfCellNumber, SudokuBoard, initializeSudokuBoard, SolutionsByRules, SudokuWizardConfiguration } from "../../services/sudoku/sudoku";
import { chenillardNorth, chenillardSouth, chenillardWest, chenillardEast, chenillardNorthEast, chenillardSouthEast, chenillardSouthWest, chenillardNorthWest } from './sudoku-chenillard';
import { isNullOrEmpty } from "../../services/helper";
const BOARD_DEV_MODE = ['%c[BOARD]', 'color:#ff11ff;font-weight: bold'];
@Component({
    tag: 'sudoku-board-component',
    styleUrl: 'sudoku-board.css',
    // shadow: true
})
export class SudokuBoardComponent {
    @Element() element: HTMLSudokuBoardComponentElement;
    @Event() cellSelection: EventEmitter;

    @Prop() solvedRow: number;
    @Watch("solvedRow")
    solvedRowWatcher(newValue: number, _oldValue: number) {
        // console.log(`solvedRowWatcher:${newValue}, ${this.cellSelected}, ${rowOfCellNumber(this.cellSelected)} ${oldValue}`);
        if (newValue === rowOfCellNumber(this.cellSelected)) {
            this.chenillardRow(this.cellSelected);
        }
    }
    @Prop() solvedCol: number;
    @Watch("solvedCol")
    solvedColWatcher(newValue: number, _oldValue: number) {
        // console.log(`solvedColWatcher:${newValue}, ${this.cellSelected},${oldValue}`);
        if (newValue === colOfCellNumber(this.cellSelected)) {
            this.chenillardCol(this.cellSelected);
        }
    }
    @Prop() solvedBlock: number;
    @Watch("solvedBlock")
    solvedBlockWatcher(newValue: number, _oldValue: number) {
        // console.log(`solvedBlockWatcher:${newValue}, ${this.cellSelected},${oldValue}`);
        if (newValue === blockOfCellNumber(this.cellSelected)) {
            this.chenillardBlock(this.cellSelected);
        }
    }

    @Prop() gameOnGoing: boolean;
    @Watch("gameOnGoing")
    endOfGameWatcher(newValue: boolean, oldValue: boolean) {
        // console.log(`endOfGameWatcher:${newValue}, ${oldValue} - cellSelected:${this.lastCellOfTheGame}`);
        if (!newValue
            && oldValue
            && (oldValue !== undefined)) {
            // this.chenillardBoard(this.lastCellOfTheGame);
            this.chenillardBoard(this.lastCellOfTheGame);
        }
    }
    @Prop() board: SudokuBoard = initializeSudokuBoard();
    // @Watch("board")
    // boardWatcher(newValue: SudokuBoard) {

    //     // reinitialize the board class
    //     this.classboard = [];

    //     const selectedValue = selectedCellValue;
    //     const selectedValueNumber = parseInt(selectedValue);
    //     const colOfCellSelected = colOfCellNumber(this.cellSelected);
    //     const rowOfCellSelected = rowOfCellNumber(this.cellSelected);
    //     const blockOfCellSelected = blockOfCellNumber(this.cellSelected);

    
    //     newValue.cells.forEach((cell, index) => {
    //         console.log(`index:${index} - cell:${cell}`)
    //         const colOfCell = colOfCellNumber(index);
    //         const rowOfCell = rowOfCellNumber(index);
    //         const blockOfCell = blockOfCellNumber(index);    

    //         if (selectedValue === "") {
    //             // mode input
    //             console.log("--- mode input");

    //             // highlight area selected
    //             this.classboard[index] += ( (colOfCell === colOfCellSelected) ||
    //                                         (rowOfCell === rowOfCellSelected) ||
    //                                         (blockOfCell === blockOfCellSelected)) ? " area-selected " : "";

    //             // highlight the selected cell
    //             this.classboard[index] += (this.cellSelected === index) ? " selected " : "";
                
    //         }else {
    //             // mode same number
    //             console.log("--- mode same number");
                
    //             if ((cell.value) === selectedValueNumber){
    //                 // highlight the value with the same value
    //             }
    //         }
    //     })

    // }

@Prop() cellSelected: number = -1;
@Prop() lastCellOfTheGame: number = -1;
@Prop() incorrectCells: number[] = [];
@Prop() solutionsByRules: SolutionsByRules = null;
@Prop() wizardConfiguration: SudokuWizardConfiguration;

chenillardBoard(cell: number) {
    const startCell = cell;
    const col = colOfCellNumber(startCell);
    const row = rowOfCellNumber(startCell);
    const block = blockOfCellNumber(startCell);

    const coeff = 6;
    let i = coeff * 0;
    chenillardNorth(this.element, col, row, block, false, 0);
    chenillardSouth(this.element, col, row, block, false, 0);
    chenillardWest(this.element, col, row, block, false, 0);
    chenillardEast(this.element, col, row, block, false, 0);
    chenillardNorthEast(this.element, col, row, block, false, 0);
    chenillardSouthEast(this.element, col, row, block, false, 0);
    chenillardNorthWest(this.element, col, row, block, false, 0);
    chenillardSouthWest(this.element, col, row, block, false, 0);
    i = coeff * 1;
    chenillardNorth(this.element, col, row, block, false, i);
    chenillardSouth(this.element, col, row, block, false, i);
    chenillardWest(this.element, col, row, block, false, i);
    chenillardEast(this.element, col, row, block, false, i);
    chenillardNorthEast(this.element, col, row, block, false, i);
    chenillardSouthEast(this.element, col, row, block, false, i);
    chenillardNorthWest(this.element, col, row, block, false, i);
    chenillardSouthWest(this.element, col, row, block, false, i);
    i = coeff * 2;
    chenillardNorth(this.element, col, row, block, false, i);
    chenillardSouth(this.element, col, row, block, false, i);
    chenillardWest(this.element, col, row, block, false, i);
    chenillardEast(this.element, col, row, block, false, i);
    chenillardNorthEast(this.element, col, row, block, false, i);
    chenillardSouthEast(this.element, col, row, block, false, i);
    chenillardNorthWest(this.element, col, row, block, false, i);
    chenillardSouthWest(this.element, col, row, block, false, i);
}

chenillardRow(startCell: number) {
    const col = colOfCellNumber(startCell);
    const row = rowOfCellNumber(startCell);
    const block = blockOfCellNumber(startCell);

    chenillardWest(this.element, col, row, block, false, 0);
    chenillardEast(this.element, col, row, block, false, 0);
}

chenillardCol(startCell: number) {
    const col = colOfCellNumber(startCell);
    const row = rowOfCellNumber(startCell);
    const block = blockOfCellNumber(startCell);

    chenillardNorth(this.element, col, row, block, false, 0);
    chenillardSouth(this.element, col, row, block, false, 0);
}

chenillardBlock(startCell: number) {
    const col = colOfCellNumber(startCell);
    const row = rowOfCellNumber(startCell);
    const block = blockOfCellNumber(startCell);

    chenillardNorth(this.element, col, row, block, true, 0);
    chenillardSouth(this.element, col, row, block, true, 0);
    chenillardWest(this.element, col, row, block, true, 0);
    chenillardEast(this.element, col, row, block, true, 0);
    chenillardNorthEast(this.element, col, row, block, true, 0);
    chenillardSouthEast(this.element, col, row, block, true, 0);
    chenillardNorthWest(this.element, col, row, block, true, 0);
    chenillardSouthWest(this.element, col, row, block, true, 0);
}

// chenillardBoard(startCell: number) {
//     const col = colOfCellNumber(startCell);
//     const row = rowOfCellNumber(startCell);
//     const block = blockOfCellNumber(startCell);

//     chenillardNorth(this.element, col, row, block, true, 0);
//     chenillardSouth(this.element, col, row, block, true, 0);
//     chenillardWest(this.element, col, row, block, true, 0);
//     chenillardEast(this.element, col, row, block, true, 0);
//     chenillardNorthEast(this.element, col, row, block, true, 0);
//     chenillardSouthEast(this.element, col, row, block, true, 0);
//     chenillardNorthWest(this.element, col, row, block, true, 0);
//     chenillardSouthWest(this.element, col, row, block, true, 0);
// }

selectedCellValue() {
    return this.cellSelected !== -1 ? this.board.cells[this.cellSelected].value + "" : "";
}

classboard:string[] = []


returnClassForTheCell(cell: number) {
    // console.log("this.cellSelected",this.cellSelected);
    const isCellSelectedCorrect = (this.cellSelected !== -1) && (this.cellSelected !== null);
    const selectedCellValue = isCellSelectedCorrect ? this.board.cells[this.cellSelected].value : null;
    const cellValue = this.board.cells[cell].value;
    
    const modeEntry = isNullOrEmpty(selectedCellValue) ;
    const modeHighlightNumber = !modeEntry;
    testEnvironment && console.debug(...BOARD_DEV_MODE,`cellSelected:${this.cellSelected} - SelectedValue:${selectedCellValue} - cellValue:${cellValue} - modeEntry:${modeEntry}`);

    const colOfCell = colOfCellNumber(cell);
    const rowOfCell = rowOfCellNumber(cell);
    const blockOfCell = blockOfCellNumber(cell);

    const colOfCellSelected = colOfCellNumber(this.cellSelected);
    const rowOfCellSelected = rowOfCellNumber(this.cellSelected);
    const blockOfCellSelected = blockOfCellNumber(this.cellSelected);

    const isIncorrectCell = this.incorrectCells.lastIndexOf(cell) !== -1;
    const incorrectClass = isIncorrectCell ? " incorrect " : "";
    
    // console.log(`cell:${cell} - selected:${this.cellSelected} - ${((this.cellSelected !== -1) && (this.cellSelected !== null))}`);

    const isNotTheSelectedCell = this.cellSelected !== cell;
    const isTheSelectedCell = this.cellSelected === cell;
    const isColRowOrBlockSelected = (colOfCell === colOfCellSelected) || (rowOfCell === rowOfCellSelected) || (blockOfCell === blockOfCellSelected)
    
    const areaSelectedClass = (modeEntry && isCellSelectedCorrect && isNotTheSelectedCell && isColRowOrBlockSelected) ? " area-selected " : "";
    const cellSelectedClass = isTheSelectedCell ? " selected " : "";
    const sameValueAsTheSelectedCellClass = modeHighlightNumber && cellValue == selectedCellValue ? " sameValueAsTheOneSelected " : "";
    testEnvironment && console.debug(...BOARD_DEV_MODE,`modeHighlightNumber: ${modeHighlightNumber} - sameValueAsTheSelectedCellClass:${sameValueAsTheSelectedCellClass}`);
    // const sameValueAsTheOneSelected = 
    //     (
    //         (selectedCellValue !== "null") &&
    //         (selectedCellValue == cellValue) &&
    //         (selectedCellValue !== "undefined") &&
    //         (cellValue !== "undefined")
    //     ) ? " selected " : "";
    // TODO: console.log(`selectCellValue:${selectedCellValue} - cellValue:${cellValue} - ${sameValueAsTheSelectedCellClass} - ${typeof (selectedCellValue)} - ${typeof (cellValue)}`);

    let isSolution_UniqueOccurenceInZoneClass = "";
    let isSolution_UniquePossibleValueClass = "";
    if (this.solutionsByRules && this.wizardConfiguration.showUniquePossibleValueInRowOrColumn) {
        const isSolution_UniquePossibleValue = this.solutionsByRules.uniquePossibleValue.filter(solution => solution.cell === cell).length > 0
        isSolution_UniquePossibleValueClass = isSolution_UniquePossibleValue ? " UniquePossibleValue" : "";
    }
    if (this.solutionsByRules && this.wizardConfiguration.showUniquePossiblrValueInZones) {
        const isSolution_UniquePossibleValueInZone = this.solutionsByRules.uniqueOccurenceInZones.filter(solution => solution.cell === cell).length > 0
        isSolution_UniqueOccurenceInZoneClass = isSolution_UniquePossibleValueInZone ? " UniqueOccurenceInZone" : "";
    }

    return `cell` +
        ` cell${cell} ` +
        ` row${rowOfCell} ` +
        ` column${colOfCell} ` +
        ` block${blockOfCell}` +
        areaSelectedClass +
        cellSelectedClass +
        sameValueAsTheSelectedCellClass +
        incorrectClass +
        isSolution_UniquePossibleValueClass +
        isSolution_UniqueOccurenceInZoneClass;
}

cellSelectedHandler(cell: number) {
    this.cellSelection.emit(cell);
}

render() {
    // console.log("Candidate board:", this.board.cells);
    return (
        <div class="sudoku-board">
            <div class="row">
                <div class={this.returnClassForTheCell(0)} onClick={() => this.cellSelectedHandler(0)}><sudoku-board-cell-component cell={this.board.cells[0]} drafted={this.board.cells[0].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(1)} onClick={() => this.cellSelectedHandler(1)}><sudoku-board-cell-component cell={this.board.cells[1]} drafted={this.board.cells[1].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(2)} onClick={() => this.cellSelectedHandler(2)}><sudoku-board-cell-component cell={this.board.cells[2]} drafted={this.board.cells[2].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(3)} onClick={() => this.cellSelectedHandler(3)}><sudoku-board-cell-component cell={this.board.cells[3]} drafted={this.board.cells[3].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(4)} onClick={() => this.cellSelectedHandler(4)}><sudoku-board-cell-component cell={this.board.cells[4]} drafted={this.board.cells[4].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(5)} onClick={() => this.cellSelectedHandler(5)}><sudoku-board-cell-component cell={this.board.cells[5]} drafted={this.board.cells[5].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(6)} onClick={() => this.cellSelectedHandler(6)}><sudoku-board-cell-component cell={this.board.cells[6]} drafted={this.board.cells[6].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(7)} onClick={() => this.cellSelectedHandler(7)}><sudoku-board-cell-component cell={this.board.cells[7]} drafted={this.board.cells[7].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(8)} onClick={() => this.cellSelectedHandler(8)}><sudoku-board-cell-component cell={this.board.cells[8]} drafted={this.board.cells[8].drafted}></sudoku-board-cell-component></div>
            </div>
            <div class="row">
                <div class={this.returnClassForTheCell(9)} onClick={() => this.cellSelectedHandler(9)}><sudoku-board-cell-component cell={this.board.cells[9]} drafted={this.board.cells[9].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(10)} onClick={() => this.cellSelectedHandler(10)}><sudoku-board-cell-component cell={this.board.cells[10]} drafted={this.board.cells[10].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(11)} onClick={() => this.cellSelectedHandler(11)}><sudoku-board-cell-component cell={this.board.cells[11]} drafted={this.board.cells[11].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(12)} onClick={() => this.cellSelectedHandler(12)}><sudoku-board-cell-component cell={this.board.cells[12]} drafted={this.board.cells[12].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(13)} onClick={() => this.cellSelectedHandler(13)}><sudoku-board-cell-component cell={this.board.cells[13]} drafted={this.board.cells[13].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(14)} onClick={() => this.cellSelectedHandler(14)}><sudoku-board-cell-component cell={this.board.cells[14]} drafted={this.board.cells[14].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(15)} onClick={() => this.cellSelectedHandler(15)}><sudoku-board-cell-component cell={this.board.cells[15]} drafted={this.board.cells[15].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(16)} onClick={() => this.cellSelectedHandler(16)}><sudoku-board-cell-component cell={this.board.cells[16]} drafted={this.board.cells[16].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(17)} onClick={() => this.cellSelectedHandler(17)}><sudoku-board-cell-component cell={this.board.cells[17]} drafted={this.board.cells[17].drafted}></sudoku-board-cell-component></div>
            </div>
            <div class="row">
                <div class={this.returnClassForTheCell(18)} onClick={() => this.cellSelectedHandler(18)}><sudoku-board-cell-component cell={this.board.cells[18]} drafted={this.board.cells[18].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(19)} onClick={() => this.cellSelectedHandler(19)}><sudoku-board-cell-component cell={this.board.cells[19]} drafted={this.board.cells[19].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(20)} onClick={() => this.cellSelectedHandler(20)}><sudoku-board-cell-component cell={this.board.cells[20]} drafted={this.board.cells[20].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(21)} onClick={() => this.cellSelectedHandler(21)}><sudoku-board-cell-component cell={this.board.cells[21]} drafted={this.board.cells[21].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(22)} onClick={() => this.cellSelectedHandler(22)}><sudoku-board-cell-component cell={this.board.cells[22]} drafted={this.board.cells[22].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(23)} onClick={() => this.cellSelectedHandler(23)}><sudoku-board-cell-component cell={this.board.cells[23]} drafted={this.board.cells[23].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(24)} onClick={() => this.cellSelectedHandler(24)}><sudoku-board-cell-component cell={this.board.cells[24]} drafted={this.board.cells[24].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(25)} onClick={() => this.cellSelectedHandler(25)}><sudoku-board-cell-component cell={this.board.cells[25]} drafted={this.board.cells[25].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(26)} onClick={() => this.cellSelectedHandler(26)}><sudoku-board-cell-component cell={this.board.cells[26]} drafted={this.board.cells[26].drafted}></sudoku-board-cell-component></div>
            </div>

            <div class="row">
                <div class={this.returnClassForTheCell(27)} onClick={() => this.cellSelectedHandler(27)}><sudoku-board-cell-component cell={this.board.cells[27]} drafted={this.board.cells[27].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(28)} onClick={() => this.cellSelectedHandler(28)}><sudoku-board-cell-component cell={this.board.cells[28]} drafted={this.board.cells[28].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(29)} onClick={() => this.cellSelectedHandler(29)}><sudoku-board-cell-component cell={this.board.cells[29]} drafted={this.board.cells[29].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(30)} onClick={() => this.cellSelectedHandler(30)}><sudoku-board-cell-component cell={this.board.cells[30]} drafted={this.board.cells[30].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(31)} onClick={() => this.cellSelectedHandler(31)}><sudoku-board-cell-component cell={this.board.cells[31]} drafted={this.board.cells[31].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(32)} onClick={() => this.cellSelectedHandler(32)}><sudoku-board-cell-component cell={this.board.cells[32]} drafted={this.board.cells[32].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(33)} onClick={() => this.cellSelectedHandler(33)}><sudoku-board-cell-component cell={this.board.cells[33]} drafted={this.board.cells[33].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(34)} onClick={() => this.cellSelectedHandler(34)}><sudoku-board-cell-component cell={this.board.cells[34]} drafted={this.board.cells[34].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(35)} onClick={() => this.cellSelectedHandler(35)}><sudoku-board-cell-component cell={this.board.cells[35]} drafted={this.board.cells[35].drafted}></sudoku-board-cell-component></div>
            </div>
            <div class="row">
                <div class={this.returnClassForTheCell(36)} onClick={() => this.cellSelectedHandler(36)}><sudoku-board-cell-component cell={this.board.cells[36]} drafted={this.board.cells[36].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(37)} onClick={() => this.cellSelectedHandler(37)}><sudoku-board-cell-component cell={this.board.cells[37]} drafted={this.board.cells[37].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(38)} onClick={() => this.cellSelectedHandler(38)}><sudoku-board-cell-component cell={this.board.cells[38]} drafted={this.board.cells[38].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(39)} onClick={() => this.cellSelectedHandler(39)}><sudoku-board-cell-component cell={this.board.cells[39]} drafted={this.board.cells[39].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(40)} onClick={() => this.cellSelectedHandler(40)}><sudoku-board-cell-component cell={this.board.cells[40]} drafted={this.board.cells[40].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(41)} onClick={() => this.cellSelectedHandler(41)}><sudoku-board-cell-component cell={this.board.cells[41]} drafted={this.board.cells[41].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(42)} onClick={() => this.cellSelectedHandler(42)}><sudoku-board-cell-component cell={this.board.cells[42]} drafted={this.board.cells[42].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(43)} onClick={() => this.cellSelectedHandler(43)}><sudoku-board-cell-component cell={this.board.cells[43]} drafted={this.board.cells[43].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(44)} onClick={() => this.cellSelectedHandler(44)}><sudoku-board-cell-component cell={this.board.cells[44]} drafted={this.board.cells[44].drafted}></sudoku-board-cell-component></div>
            </div>
            <div class="row">
                <div class={this.returnClassForTheCell(45)} onClick={() => this.cellSelectedHandler(45)}><sudoku-board-cell-component cell={this.board.cells[45]} drafted={this.board.cells[45].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(46)} onClick={() => this.cellSelectedHandler(46)}><sudoku-board-cell-component cell={this.board.cells[46]} drafted={this.board.cells[46].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(47)} onClick={() => this.cellSelectedHandler(47)}><sudoku-board-cell-component cell={this.board.cells[47]} drafted={this.board.cells[47].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(48)} onClick={() => this.cellSelectedHandler(48)}><sudoku-board-cell-component cell={this.board.cells[48]} drafted={this.board.cells[48].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(49)} onClick={() => this.cellSelectedHandler(49)}><sudoku-board-cell-component cell={this.board.cells[49]} drafted={this.board.cells[49].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(50)} onClick={() => this.cellSelectedHandler(50)}><sudoku-board-cell-component cell={this.board.cells[50]} drafted={this.board.cells[50].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(51)} onClick={() => this.cellSelectedHandler(51)}><sudoku-board-cell-component cell={this.board.cells[51]} drafted={this.board.cells[51].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(52)} onClick={() => this.cellSelectedHandler(52)}><sudoku-board-cell-component cell={this.board.cells[52]} drafted={this.board.cells[52].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(53)} onClick={() => this.cellSelectedHandler(53)}><sudoku-board-cell-component cell={this.board.cells[53]} drafted={this.board.cells[53].drafted}></sudoku-board-cell-component></div>
            </div>

            <div class="row">
                <div class={this.returnClassForTheCell(54)} onClick={() => this.cellSelectedHandler(54)}><sudoku-board-cell-component cell={this.board.cells[54]} drafted={this.board.cells[54].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(55)} onClick={() => this.cellSelectedHandler(55)}><sudoku-board-cell-component cell={this.board.cells[55]} drafted={this.board.cells[55].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(56)} onClick={() => this.cellSelectedHandler(56)}><sudoku-board-cell-component cell={this.board.cells[56]} drafted={this.board.cells[56].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(57)} onClick={() => this.cellSelectedHandler(57)}><sudoku-board-cell-component cell={this.board.cells[57]} drafted={this.board.cells[57].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(58)} onClick={() => this.cellSelectedHandler(58)}><sudoku-board-cell-component cell={this.board.cells[58]} drafted={this.board.cells[58].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(59)} onClick={() => this.cellSelectedHandler(59)}><sudoku-board-cell-component cell={this.board.cells[59]} drafted={this.board.cells[59].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(60)} onClick={() => this.cellSelectedHandler(60)}><sudoku-board-cell-component cell={this.board.cells[60]} drafted={this.board.cells[60].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(61)} onClick={() => this.cellSelectedHandler(61)}><sudoku-board-cell-component cell={this.board.cells[61]} drafted={this.board.cells[61].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(62)} onClick={() => this.cellSelectedHandler(62)}><sudoku-board-cell-component cell={this.board.cells[62]} drafted={this.board.cells[62].drafted}></sudoku-board-cell-component></div>
            </div>
            <div class="row">
                <div class={this.returnClassForTheCell(63)} onClick={() => this.cellSelectedHandler(63)}><sudoku-board-cell-component cell={this.board.cells[63]} drafted={this.board.cells[63].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(64)} onClick={() => this.cellSelectedHandler(64)}><sudoku-board-cell-component cell={this.board.cells[64]} drafted={this.board.cells[64].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(65)} onClick={() => this.cellSelectedHandler(65)}><sudoku-board-cell-component cell={this.board.cells[65]} drafted={this.board.cells[65].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(66)} onClick={() => this.cellSelectedHandler(66)}><sudoku-board-cell-component cell={this.board.cells[66]} drafted={this.board.cells[66].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(67)} onClick={() => this.cellSelectedHandler(67)}><sudoku-board-cell-component cell={this.board.cells[67]} drafted={this.board.cells[67].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(68)} onClick={() => this.cellSelectedHandler(68)}><sudoku-board-cell-component cell={this.board.cells[68]} drafted={this.board.cells[68].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(69)} onClick={() => this.cellSelectedHandler(69)}><sudoku-board-cell-component cell={this.board.cells[69]} drafted={this.board.cells[69].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(70)} onClick={() => this.cellSelectedHandler(70)}><sudoku-board-cell-component cell={this.board.cells[70]} drafted={this.board.cells[70].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(71)} onClick={() => this.cellSelectedHandler(71)}><sudoku-board-cell-component cell={this.board.cells[71]} drafted={this.board.cells[71].drafted}></sudoku-board-cell-component></div>
            </div>
            <div class="row">
                <div class={this.returnClassForTheCell(72)} onClick={() => this.cellSelectedHandler(72)}><sudoku-board-cell-component cell={this.board.cells[72]} drafted={this.board.cells[72].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(73)} onClick={() => this.cellSelectedHandler(73)}><sudoku-board-cell-component cell={this.board.cells[73]} drafted={this.board.cells[73].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(74)} onClick={() => this.cellSelectedHandler(74)}><sudoku-board-cell-component cell={this.board.cells[74]} drafted={this.board.cells[74].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(75)} onClick={() => this.cellSelectedHandler(75)}><sudoku-board-cell-component cell={this.board.cells[75]} drafted={this.board.cells[75].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(76)} onClick={() => this.cellSelectedHandler(76)}><sudoku-board-cell-component cell={this.board.cells[76]} drafted={this.board.cells[76].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(77)} onClick={() => this.cellSelectedHandler(77)}><sudoku-board-cell-component cell={this.board.cells[77]} drafted={this.board.cells[77].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(78)} onClick={() => this.cellSelectedHandler(78)}><sudoku-board-cell-component cell={this.board.cells[78]} drafted={this.board.cells[78].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(79)} onClick={() => this.cellSelectedHandler(79)}><sudoku-board-cell-component cell={this.board.cells[79]} drafted={this.board.cells[79].drafted}></sudoku-board-cell-component></div>
                <div class={this.returnClassForTheCell(80)} onClick={() => this.cellSelectedHandler(80)}><sudoku-board-cell-component cell={this.board.cells[80]} drafted={this.board.cells[80].drafted}></sudoku-board-cell-component></div>
            </div>
        </div>
    );
}
}


