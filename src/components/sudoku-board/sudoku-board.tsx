import { Component, EventEmitter, Event, Element, Prop, Watch } from '@stencil/core';
import { colOfCellNumber, rowOfCellNumber, zoneOfCellNumber } from "../../services/sudoku/sudoku";

@Component({
    tag: 'sudoku-board',
    styleUrl: 'sudoku-board.css',
    shadow: true
})
export class SudokuBoard {
    @Element() element: HTMLSudokuBoardElement;
    @Event() cellSelection: EventEmitter;

    @Prop() solvedRow: number;
    @Prop() solvedCol: number;
    @Prop() solvedZone: number;
    @Prop() boardSolved: boolean;
    @Prop() board: number[] = Array(81);
    @Prop() candidatesBoard: boolean[][] = Array(81);

    @Watch('candidatesBoard')
    watchHandler(newValue) {
        for (let index = 0; index < newValue.length; index++) {
            this.candidatesBoard[index] = [...newValue[index]];
        }
    }
    @Prop() cellSelected: number = -1;

    @Prop() incorrectCells: number[] = [];

    @Watch("solvedCol")
    solvedColWatcher(newValue: number) {
        // console.log(`solvedColWatcher:${newValue}, ${oldValue}`);
        if (newValue != 0 && newValue != undefined) {
            this.chenillardCol(newValue, this.cellSelected);
        }
    }
    
    @Watch("solvedRow")
    solvedRowWatcher(newValue: number) {
        // console.log(`solvedRowWatcher:${newValue}, ${oldValue}`);
        if (newValue != 0 && newValue != undefined) {
            this.chenillardRow(newValue, this.cellSelected);
        }
    }
    
    @Watch("boardSolved")
    boardSolvedWatcher(newValue: number) {
        // console.log(`boardSolvedWatcher:${newValue}, ${oldValue}`);
        if (newValue != 0 && newValue != undefined) {
            this.chenillardBoard(this.cellSelected);
        }
    }

    chenillardCol(column: number, startCell: number) {
        const rowOfCellNumber_ = rowOfCellNumber(startCell);
        console.log(`chenillardCol:${column},${startCell},${rowOfCellNumber_}`);

        const cellsOfCol = this.element.shadowRoot.querySelectorAll(`.column${column}`);
        this.addRemoveChenillardClassToElement(cellsOfCol[rowOfCellNumber_],0);
        
        for (let index = rowOfCellNumber_ -1; index >= 0 ; index--) {
            // console.log("for#1",index);
            const elt = cellsOfCol[index];
            this.addRemoveChenillardClassToElement(elt, (rowOfCellNumber_ - index) );
        }
        for (let index = rowOfCellNumber_ + 1; index < 9 ; index++) {
            // console.log("for#2",index);
            const elt = cellsOfCol[index];
            this.addRemoveChenillardClassToElement(elt, ( index - rowOfCellNumber_));
        }
        

    }

    chenillardBoard() {
        // TODO: improve with several / randomize highlight
        // console.log(`chenillard Board - cell selected:${startCell}`)
        const cellsOfTheBoard = this.element.shadowRoot.querySelectorAll(`.cell`);
        for (let index = 0; index < cellsOfTheBoard.length; index++) {
            const cell = cellsOfTheBoard[index];
            this.addRemoveChenillardClassToElement(cell,index);
        }

    }

    chenillardRow(row: number, startCell: number) {
        const colOfCellNumber_ = colOfCellNumber(startCell);
        console.log(`chenillardCol:${row},${startCell},${colOfCellNumber_}`);

        const cellsOfRow = this.element.shadowRoot.querySelectorAll(`.row${row}`);
        this.addRemoveChenillardClassToElement(cellsOfRow[colOfCellNumber_],0);
        
        for (let index = colOfCellNumber_ -1; index >= 0 ; index--) {
            // console.log("for#1",index);
            const elt = cellsOfRow[index];
            this.addRemoveChenillardClassToElement(elt, (colOfCellNumber_ - index) );
        }
        for (let index = colOfCellNumber_ + 1; index < 9 ; index++) {
            // console.log("for#2",index);
            const elt = cellsOfRow[index];
            this.addRemoveChenillardClassToElement(elt, ( index - colOfCellNumber_));
        }
    }

    addRemoveChenillardClassToElement(element:Element, delayCoeff:number){
        const delay = delayCoeff * 100; 
        setTimeout(()=>{
            element.classList.add("chenillardCol");
            setTimeout(() => {
                element.classList.remove("chenillardCol");
            }, 200);
        }, delay)
    }

    returnClassForTheCell(cell: number) {
        const selectedCellValue = this.board[this.cellSelected] + "";
        const cellValue = this.board[cell] + "";

        const colOfCell = colOfCellNumber(cell);
        const rowOfCell = rowOfCellNumber(cell);
        const zoneOfCell = zoneOfCellNumber(cell);

        const colOfCellSelected = colOfCellNumber(this.cellSelected);
        const rowOfCellSelected = rowOfCellNumber(this.cellSelected);
        const zoneOfCellSelected = zoneOfCellNumber(this.cellSelected);

        const isIncorrectCell = this.incorrectCells.lastIndexOf(cell) !== -1;
        const incorrectClass = isIncorrectCell ? " incorrect " : "";
        // console.log(`cell:${cell} - selected:${this.cellSelected} - ${((this.cellSelected !== -1) && (this.cellSelected !== null))}`);
        const cellsSelectedClass = ((this.cellSelected !== -1) &&
            (this.cellSelected !== null) &&
            (this.cellSelected !== cell) &&
            ((colOfCell === colOfCellSelected) ||
                (rowOfCell === rowOfCellSelected) ||
                (zoneOfCell === zoneOfCellSelected))) ? " area-selected " : "";
        const cellSelectedClass = (this.cellSelected === cell) ? " selected " : "";

        const sameValueAsTheOneSelected =
            (
                (selectedCellValue !== "null") &&
                (selectedCellValue == cellValue) &&
                (selectedCellValue !== "undefined") &&
                (cellValue !== "undefined")
            ) ? " selected " : "";
        // console.log(`selectCellValue:${selectedCellValue} - cellValue:${cellValue} - ${sameValueAsTheOneSelected} - ${typeof (selectedCellValue)} - ${typeof (cellValue)}`);
        return `cell` +
            ` cell${cell} ` +
            ` row${rowOfCell} ` +
            ` column${colOfCell} ` +
            ` zone${zoneOfCell}` +
            cellsSelectedClass +
            cellSelectedClass +
            sameValueAsTheOneSelected +
            incorrectClass;
    }

    cellSelectedHandler(cell: number) {
        this.cellSelection.emit(cell);
    }

    render() {
        // console.log("Candidate board:", this.candidatesBoard);
        return (
            <div class="sudoku-board">
                <div class="row">
                    <div class={this.returnClassForTheCell(0)} onClick={() => this.cellSelectedHandler(0)}><sudoku-board-cell value={this.board[0]} candidates={this.candidatesBoard[0]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(1)} onClick={() => this.cellSelectedHandler(1)}><sudoku-board-cell value={this.board[1]} candidates={this.candidatesBoard[1]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(2)} onClick={() => this.cellSelectedHandler(2)}><sudoku-board-cell value={this.board[2]} candidates={this.candidatesBoard[2]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(3)} onClick={() => this.cellSelectedHandler(3)}><sudoku-board-cell value={this.board[3]} candidates={this.candidatesBoard[3]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(4)} onClick={() => this.cellSelectedHandler(4)}><sudoku-board-cell value={this.board[4]} candidates={this.candidatesBoard[4]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(5)} onClick={() => this.cellSelectedHandler(5)}><sudoku-board-cell value={this.board[5]} candidates={this.candidatesBoard[5]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(6)} onClick={() => this.cellSelectedHandler(6)}><sudoku-board-cell value={this.board[6]} candidates={this.candidatesBoard[6]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(7)} onClick={() => this.cellSelectedHandler(7)}><sudoku-board-cell value={this.board[7]} candidates={this.candidatesBoard[7]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(8)} onClick={() => this.cellSelectedHandler(8)}><sudoku-board-cell value={this.board[8]} candidates={this.candidatesBoard[8]}></sudoku-board-cell></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(9)} onClick={() => this.cellSelectedHandler(9)}><sudoku-board-cell value={this.board[9]} candidates={this.candidatesBoard[9]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(10)} onClick={() => this.cellSelectedHandler(10)}><sudoku-board-cell value={this.board[10]} candidates={this.candidatesBoard[10]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(11)} onClick={() => this.cellSelectedHandler(11)}><sudoku-board-cell value={this.board[11]} candidates={this.candidatesBoard[11]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(12)} onClick={() => this.cellSelectedHandler(12)}><sudoku-board-cell value={this.board[12]} candidates={this.candidatesBoard[12]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(13)} onClick={() => this.cellSelectedHandler(13)}><sudoku-board-cell value={this.board[13]} candidates={this.candidatesBoard[13]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(14)} onClick={() => this.cellSelectedHandler(14)}><sudoku-board-cell value={this.board[14]} candidates={this.candidatesBoard[14]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(15)} onClick={() => this.cellSelectedHandler(15)}><sudoku-board-cell value={this.board[15]} candidates={this.candidatesBoard[15]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(16)} onClick={() => this.cellSelectedHandler(16)}><sudoku-board-cell value={this.board[16]} candidates={this.candidatesBoard[16]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(17)} onClick={() => this.cellSelectedHandler(17)}><sudoku-board-cell value={this.board[17]} candidates={this.candidatesBoard[17]}></sudoku-board-cell></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(18)} onClick={() => this.cellSelectedHandler(18)}><sudoku-board-cell value={this.board[18]} candidates={this.candidatesBoard[18]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(19)} onClick={() => this.cellSelectedHandler(19)}><sudoku-board-cell value={this.board[19]} candidates={this.candidatesBoard[19]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(20)} onClick={() => this.cellSelectedHandler(20)}><sudoku-board-cell value={this.board[20]} candidates={this.candidatesBoard[20]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(21)} onClick={() => this.cellSelectedHandler(21)}><sudoku-board-cell value={this.board[21]} candidates={this.candidatesBoard[21]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(22)} onClick={() => this.cellSelectedHandler(22)}><sudoku-board-cell value={this.board[22]} candidates={this.candidatesBoard[22]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(23)} onClick={() => this.cellSelectedHandler(23)}><sudoku-board-cell value={this.board[23]} candidates={this.candidatesBoard[23]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(24)} onClick={() => this.cellSelectedHandler(24)}><sudoku-board-cell value={this.board[24]} candidates={this.candidatesBoard[24]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(25)} onClick={() => this.cellSelectedHandler(25)}><sudoku-board-cell value={this.board[25]} candidates={this.candidatesBoard[25]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(26)} onClick={() => this.cellSelectedHandler(26)}><sudoku-board-cell value={this.board[26]} candidates={this.candidatesBoard[26]}></sudoku-board-cell></div>
                </div>

                <div class="row">
                    <div class={this.returnClassForTheCell(27)} onClick={() => this.cellSelectedHandler(27)}><sudoku-board-cell value={this.board[27]} candidates={this.candidatesBoard[27]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(28)} onClick={() => this.cellSelectedHandler(28)}><sudoku-board-cell value={this.board[28]} candidates={this.candidatesBoard[28]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(29)} onClick={() => this.cellSelectedHandler(29)}><sudoku-board-cell value={this.board[29]} candidates={this.candidatesBoard[29]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(30)} onClick={() => this.cellSelectedHandler(30)}><sudoku-board-cell value={this.board[30]} candidates={this.candidatesBoard[30]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(31)} onClick={() => this.cellSelectedHandler(31)}><sudoku-board-cell value={this.board[31]} candidates={this.candidatesBoard[31]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(32)} onClick={() => this.cellSelectedHandler(32)}><sudoku-board-cell value={this.board[32]} candidates={this.candidatesBoard[32]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(33)} onClick={() => this.cellSelectedHandler(33)}><sudoku-board-cell value={this.board[33]} candidates={this.candidatesBoard[33]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(34)} onClick={() => this.cellSelectedHandler(34)}><sudoku-board-cell value={this.board[34]} candidates={this.candidatesBoard[34]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(35)} onClick={() => this.cellSelectedHandler(35)}><sudoku-board-cell value={this.board[35]} candidates={this.candidatesBoard[35]}></sudoku-board-cell></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(36)} onClick={() => this.cellSelectedHandler(36)}><sudoku-board-cell value={this.board[36]} candidates={this.candidatesBoard[36]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(37)} onClick={() => this.cellSelectedHandler(37)}><sudoku-board-cell value={this.board[37]} candidates={this.candidatesBoard[37]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(38)} onClick={() => this.cellSelectedHandler(38)}><sudoku-board-cell value={this.board[38]} candidates={this.candidatesBoard[38]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(39)} onClick={() => this.cellSelectedHandler(39)}><sudoku-board-cell value={this.board[39]} candidates={this.candidatesBoard[39]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(40)} onClick={() => this.cellSelectedHandler(40)}><sudoku-board-cell value={this.board[40]} candidates={this.candidatesBoard[40]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(41)} onClick={() => this.cellSelectedHandler(41)}><sudoku-board-cell value={this.board[41]} candidates={this.candidatesBoard[41]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(42)} onClick={() => this.cellSelectedHandler(42)}><sudoku-board-cell value={this.board[42]} candidates={this.candidatesBoard[42]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(43)} onClick={() => this.cellSelectedHandler(43)}><sudoku-board-cell value={this.board[43]} candidates={this.candidatesBoard[43]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(44)} onClick={() => this.cellSelectedHandler(44)}><sudoku-board-cell value={this.board[44]} candidates={this.candidatesBoard[44]}></sudoku-board-cell></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(45)} onClick={() => this.cellSelectedHandler(45)}><sudoku-board-cell value={this.board[45]} candidates={this.candidatesBoard[45]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(46)} onClick={() => this.cellSelectedHandler(46)}><sudoku-board-cell value={this.board[46]} candidates={this.candidatesBoard[46]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(47)} onClick={() => this.cellSelectedHandler(47)}><sudoku-board-cell value={this.board[47]} candidates={this.candidatesBoard[47]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(48)} onClick={() => this.cellSelectedHandler(48)}><sudoku-board-cell value={this.board[48]} candidates={this.candidatesBoard[48]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(49)} onClick={() => this.cellSelectedHandler(49)}><sudoku-board-cell value={this.board[49]} candidates={this.candidatesBoard[49]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(50)} onClick={() => this.cellSelectedHandler(50)}><sudoku-board-cell value={this.board[50]} candidates={this.candidatesBoard[50]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(51)} onClick={() => this.cellSelectedHandler(51)}><sudoku-board-cell value={this.board[51]} candidates={this.candidatesBoard[51]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(52)} onClick={() => this.cellSelectedHandler(52)}><sudoku-board-cell value={this.board[52]} candidates={this.candidatesBoard[52]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(53)} onClick={() => this.cellSelectedHandler(53)}><sudoku-board-cell value={this.board[53]} candidates={this.candidatesBoard[53]}></sudoku-board-cell></div>
                </div>

                <div class="row">
                    <div class={this.returnClassForTheCell(54)} onClick={() => this.cellSelectedHandler(54)}><sudoku-board-cell value={this.board[54]} candidates={this.candidatesBoard[54]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(55)} onClick={() => this.cellSelectedHandler(55)}><sudoku-board-cell value={this.board[55]} candidates={this.candidatesBoard[55]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(56)} onClick={() => this.cellSelectedHandler(56)}><sudoku-board-cell value={this.board[56]} candidates={this.candidatesBoard[56]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(57)} onClick={() => this.cellSelectedHandler(57)}><sudoku-board-cell value={this.board[57]} candidates={this.candidatesBoard[57]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(58)} onClick={() => this.cellSelectedHandler(58)}><sudoku-board-cell value={this.board[58]} candidates={this.candidatesBoard[58]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(59)} onClick={() => this.cellSelectedHandler(59)}><sudoku-board-cell value={this.board[59]} candidates={this.candidatesBoard[59]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(60)} onClick={() => this.cellSelectedHandler(60)}><sudoku-board-cell value={this.board[60]} candidates={this.candidatesBoard[60]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(61)} onClick={() => this.cellSelectedHandler(61)}><sudoku-board-cell value={this.board[61]} candidates={this.candidatesBoard[61]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(62)} onClick={() => this.cellSelectedHandler(62)}><sudoku-board-cell value={this.board[62]} candidates={this.candidatesBoard[62]}></sudoku-board-cell></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(63)} onClick={() => this.cellSelectedHandler(63)}><sudoku-board-cell value={this.board[63]} candidates={this.candidatesBoard[63]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(64)} onClick={() => this.cellSelectedHandler(64)}><sudoku-board-cell value={this.board[64]} candidates={this.candidatesBoard[64]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(65)} onClick={() => this.cellSelectedHandler(65)}><sudoku-board-cell value={this.board[65]} candidates={this.candidatesBoard[65]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(66)} onClick={() => this.cellSelectedHandler(66)}><sudoku-board-cell value={this.board[66]} candidates={this.candidatesBoard[66]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(67)} onClick={() => this.cellSelectedHandler(67)}><sudoku-board-cell value={this.board[67]} candidates={this.candidatesBoard[67]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(68)} onClick={() => this.cellSelectedHandler(68)}><sudoku-board-cell value={this.board[68]} candidates={this.candidatesBoard[68]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(69)} onClick={() => this.cellSelectedHandler(69)}><sudoku-board-cell value={this.board[69]} candidates={this.candidatesBoard[69]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(70)} onClick={() => this.cellSelectedHandler(70)}><sudoku-board-cell value={this.board[70]} candidates={this.candidatesBoard[70]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(71)} onClick={() => this.cellSelectedHandler(71)}><sudoku-board-cell value={this.board[71]} candidates={this.candidatesBoard[71]}></sudoku-board-cell></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(72)} onClick={() => this.cellSelectedHandler(72)}><sudoku-board-cell value={this.board[72]} candidates={this.candidatesBoard[72]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(73)} onClick={() => this.cellSelectedHandler(73)}><sudoku-board-cell value={this.board[73]} candidates={this.candidatesBoard[73]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(74)} onClick={() => this.cellSelectedHandler(74)}><sudoku-board-cell value={this.board[74]} candidates={this.candidatesBoard[74]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(75)} onClick={() => this.cellSelectedHandler(75)}><sudoku-board-cell value={this.board[75]} candidates={this.candidatesBoard[75]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(76)} onClick={() => this.cellSelectedHandler(76)}><sudoku-board-cell value={this.board[76]} candidates={this.candidatesBoard[76]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(77)} onClick={() => this.cellSelectedHandler(77)}><sudoku-board-cell value={this.board[77]} candidates={this.candidatesBoard[77]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(78)} onClick={() => this.cellSelectedHandler(78)}><sudoku-board-cell value={this.board[78]} candidates={this.candidatesBoard[78]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(79)} onClick={() => this.cellSelectedHandler(79)}><sudoku-board-cell value={this.board[79]} candidates={this.candidatesBoard[79]}></sudoku-board-cell></div>
                    <div class={this.returnClassForTheCell(80)} onClick={() => this.cellSelectedHandler(80)}><sudoku-board-cell value={this.board[80]} candidates={this.candidatesBoard[80]}></sudoku-board-cell></div>
                </div>
            </div>
        );
    }
}


