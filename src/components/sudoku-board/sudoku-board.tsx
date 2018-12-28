import { Component, EventEmitter, Event, Element, Prop, Watch } from '@stencil/core';
import { colOfCellNumber, rowOfCellNumber, blockOfCellNumber, SudokuBoard, initializeSudokuBoard } from "../../services/sudoku/sudoku";

@Component({
    tag: 'sudoku-board-component',
    styleUrl: 'sudoku-board.css',
    // shadow: true
})
export class SudokuBoardComponent {
    @Element() element: HTMLSudokuBoardComponentElement;
    @Event() cellSelection: EventEmitter;
 
    @Prop() solvedRow: number;
    @Prop() solvedCol: number;
    @Prop() solvedBlock: number;
    @Prop() boardSolved: boolean;
    @Prop() board: SudokuBoard = initializeSudokuBoard();
    // @Prop() candidatesBoard: boolean[][] = Array(81);

    // @Watch('candidatesBoard')
    // watchHandler(newValue) {
    //     for (let index = 0; index < newValue.length; index++) {
    //         this.board.cells[index] = [...newValue[index]];
    //     }
    // }
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
            this.chenillardBoard();
        }
    }

    chenillardCol(column: number, startCell: number) {
        const rowOfCellNumber_ = rowOfCellNumber(startCell);
        console.log(`chenillardCol:${column},${startCell},${rowOfCellNumber_}`);

        // const cellsOfCol = this.element.shadowRoot.querySelectorAll(`.column${column}`);
        const cellsOfCol = this.element.querySelectorAll(`.column${column}`);
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
        // const cellsOfTheBoard = this.element.shadowRoot.querySelectorAll(`.cell`);
        const cellsOfTheBoard = this.element.querySelectorAll(`.cell`);
        for (let index = 0; index < cellsOfTheBoard.length; index++) {
            const cell = cellsOfTheBoard[index];
            this.addRemoveChenillardClassToElement(cell,index);
        }

    }

    chenillardRow(row: number, startCell: number) {
        const colOfCellNumber_ = colOfCellNumber(startCell);
        console.log(`chenillardCol:${row},${startCell},${colOfCellNumber_}`);

        // const cellsOfRow = this.element.shadowRoot.querySelectorAll(`.row${row}`);
        const cellsOfRow = this.element.querySelectorAll(`.row${row}`);
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
        // console.log("this.cellSelected",this.cellSelected);
        const selectedCellValue = this.cellSelected !== -1? this.board.cells[this.cellSelected].value + "" : "";
        const cellValue = this.board.cells[cell].value + "";

        const colOfCell = colOfCellNumber(cell);
        const rowOfCell = rowOfCellNumber(cell);
        const blockOfCell = blockOfCellNumber(cell);

        const colOfCellSelected = colOfCellNumber(this.cellSelected);
        const rowOfCellSelected = rowOfCellNumber(this.cellSelected);
        const blockOfCellSelected = blockOfCellNumber(this.cellSelected);

        const isIncorrectCell = this.incorrectCells.lastIndexOf(cell) !== -1;
        const incorrectClass = isIncorrectCell ? " incorrect " : "";
        // console.log(`cell:${cell} - selected:${this.cellSelected} - ${((this.cellSelected !== -1) && (this.cellSelected !== null))}`);
        const cellsSelectedClass = ((this.cellSelected !== -1) &&
            (this.cellSelected !== null) &&
            (this.cellSelected !== cell) &&
            ((colOfCell === colOfCellSelected) ||
                (rowOfCell === rowOfCellSelected) ||
                (blockOfCell === blockOfCellSelected))) ? " area-selected " : "";
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
            ` block${blockOfCell}` +
            cellsSelectedClass +
            cellSelectedClass +
            sameValueAsTheOneSelected +
            incorrectClass;
    }

    cellSelectedHandler(cell: number) {
        this.cellSelection.emit(cell);
    }

    render() {
        // console.log("Candidate board:", this.board.cells);
        return (
            <div class="sudoku-board">
                <div class="row">
                    <div class={this.returnClassForTheCell(0)} onClick={() => this.cellSelectedHandler(0)}><sudoku-board-cell-component cell={this.board.cells[0]} candidates={this.board.cells[0].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(1)} onClick={() => this.cellSelectedHandler(1)}><sudoku-board-cell-component cell={this.board.cells[1]} candidates={this.board.cells[1].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(2)} onClick={() => this.cellSelectedHandler(2)}><sudoku-board-cell-component cell={this.board.cells[2]} candidates={this.board.cells[2].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(3)} onClick={() => this.cellSelectedHandler(3)}><sudoku-board-cell-component cell={this.board.cells[3]} candidates={this.board.cells[3].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(4)} onClick={() => this.cellSelectedHandler(4)}><sudoku-board-cell-component cell={this.board.cells[4]} candidates={this.board.cells[4].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(5)} onClick={() => this.cellSelectedHandler(5)}><sudoku-board-cell-component cell={this.board.cells[5]} candidates={this.board.cells[5].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(6)} onClick={() => this.cellSelectedHandler(6)}><sudoku-board-cell-component cell={this.board.cells[6]} candidates={this.board.cells[6].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(7)} onClick={() => this.cellSelectedHandler(7)}><sudoku-board-cell-component cell={this.board.cells[7]} candidates={this.board.cells[7].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(8)} onClick={() => this.cellSelectedHandler(8)}><sudoku-board-cell-component cell={this.board.cells[8]} candidates={this.board.cells[8].candidates}></sudoku-board-cell-component></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(9)} onClick={() => this.cellSelectedHandler(9)}><sudoku-board-cell-component cell={this.board.cells[9]} candidates={this.board.cells[9].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(10)} onClick={() => this.cellSelectedHandler(10)}><sudoku-board-cell-component cell={this.board.cells[10]} candidates={this.board.cells[10].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(11)} onClick={() => this.cellSelectedHandler(11)}><sudoku-board-cell-component cell={this.board.cells[11]} candidates={this.board.cells[11].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(12)} onClick={() => this.cellSelectedHandler(12)}><sudoku-board-cell-component cell={this.board.cells[12]} candidates={this.board.cells[12].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(13)} onClick={() => this.cellSelectedHandler(13)}><sudoku-board-cell-component cell={this.board.cells[13]} candidates={this.board.cells[13].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(14)} onClick={() => this.cellSelectedHandler(14)}><sudoku-board-cell-component cell={this.board.cells[14]} candidates={this.board.cells[14].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(15)} onClick={() => this.cellSelectedHandler(15)}><sudoku-board-cell-component cell={this.board.cells[15]} candidates={this.board.cells[15].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(16)} onClick={() => this.cellSelectedHandler(16)}><sudoku-board-cell-component cell={this.board.cells[16]} candidates={this.board.cells[16].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(17)} onClick={() => this.cellSelectedHandler(17)}><sudoku-board-cell-component cell={this.board.cells[17]} candidates={this.board.cells[17].candidates}></sudoku-board-cell-component></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(18)} onClick={() => this.cellSelectedHandler(18)}><sudoku-board-cell-component cell={this.board.cells[18]} candidates={this.board.cells[18].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(19)} onClick={() => this.cellSelectedHandler(19)}><sudoku-board-cell-component cell={this.board.cells[19]} candidates={this.board.cells[19].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(20)} onClick={() => this.cellSelectedHandler(20)}><sudoku-board-cell-component cell={this.board.cells[20]} candidates={this.board.cells[20].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(21)} onClick={() => this.cellSelectedHandler(21)}><sudoku-board-cell-component cell={this.board.cells[21]} candidates={this.board.cells[21].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(22)} onClick={() => this.cellSelectedHandler(22)}><sudoku-board-cell-component cell={this.board.cells[22]} candidates={this.board.cells[22].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(23)} onClick={() => this.cellSelectedHandler(23)}><sudoku-board-cell-component cell={this.board.cells[23]} candidates={this.board.cells[23].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(24)} onClick={() => this.cellSelectedHandler(24)}><sudoku-board-cell-component cell={this.board.cells[24]} candidates={this.board.cells[24].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(25)} onClick={() => this.cellSelectedHandler(25)}><sudoku-board-cell-component cell={this.board.cells[25]} candidates={this.board.cells[25].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(26)} onClick={() => this.cellSelectedHandler(26)}><sudoku-board-cell-component cell={this.board.cells[26]} candidates={this.board.cells[26].candidates}></sudoku-board-cell-component></div>
                </div>

                <div class="row">
                    <div class={this.returnClassForTheCell(27)} onClick={() => this.cellSelectedHandler(27)}><sudoku-board-cell-component cell={this.board.cells[27]} candidates={this.board.cells[27].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(28)} onClick={() => this.cellSelectedHandler(28)}><sudoku-board-cell-component cell={this.board.cells[28]} candidates={this.board.cells[28].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(29)} onClick={() => this.cellSelectedHandler(29)}><sudoku-board-cell-component cell={this.board.cells[29]} candidates={this.board.cells[29].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(30)} onClick={() => this.cellSelectedHandler(30)}><sudoku-board-cell-component cell={this.board.cells[30]} candidates={this.board.cells[30].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(31)} onClick={() => this.cellSelectedHandler(31)}><sudoku-board-cell-component cell={this.board.cells[31]} candidates={this.board.cells[31].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(32)} onClick={() => this.cellSelectedHandler(32)}><sudoku-board-cell-component cell={this.board.cells[32]} candidates={this.board.cells[32].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(33)} onClick={() => this.cellSelectedHandler(33)}><sudoku-board-cell-component cell={this.board.cells[33]} candidates={this.board.cells[33].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(34)} onClick={() => this.cellSelectedHandler(34)}><sudoku-board-cell-component cell={this.board.cells[34]} candidates={this.board.cells[34].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(35)} onClick={() => this.cellSelectedHandler(35)}><sudoku-board-cell-component cell={this.board.cells[35]} candidates={this.board.cells[35].candidates}></sudoku-board-cell-component></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(36)} onClick={() => this.cellSelectedHandler(36)}><sudoku-board-cell-component cell={this.board.cells[36]} candidates={this.board.cells[36].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(37)} onClick={() => this.cellSelectedHandler(37)}><sudoku-board-cell-component cell={this.board.cells[37]} candidates={this.board.cells[37].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(38)} onClick={() => this.cellSelectedHandler(38)}><sudoku-board-cell-component cell={this.board.cells[38]} candidates={this.board.cells[38].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(39)} onClick={() => this.cellSelectedHandler(39)}><sudoku-board-cell-component cell={this.board.cells[39]} candidates={this.board.cells[39].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(40)} onClick={() => this.cellSelectedHandler(40)}><sudoku-board-cell-component cell={this.board.cells[40]} candidates={this.board.cells[40].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(41)} onClick={() => this.cellSelectedHandler(41)}><sudoku-board-cell-component cell={this.board.cells[41]} candidates={this.board.cells[41].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(42)} onClick={() => this.cellSelectedHandler(42)}><sudoku-board-cell-component cell={this.board.cells[42]} candidates={this.board.cells[42].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(43)} onClick={() => this.cellSelectedHandler(43)}><sudoku-board-cell-component cell={this.board.cells[43]} candidates={this.board.cells[43].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(44)} onClick={() => this.cellSelectedHandler(44)}><sudoku-board-cell-component cell={this.board.cells[44]} candidates={this.board.cells[44].candidates}></sudoku-board-cell-component></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(45)} onClick={() => this.cellSelectedHandler(45)}><sudoku-board-cell-component cell={this.board.cells[45]} candidates={this.board.cells[45].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(46)} onClick={() => this.cellSelectedHandler(46)}><sudoku-board-cell-component cell={this.board.cells[46]} candidates={this.board.cells[46].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(47)} onClick={() => this.cellSelectedHandler(47)}><sudoku-board-cell-component cell={this.board.cells[47]} candidates={this.board.cells[47].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(48)} onClick={() => this.cellSelectedHandler(48)}><sudoku-board-cell-component cell={this.board.cells[48]} candidates={this.board.cells[48].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(49)} onClick={() => this.cellSelectedHandler(49)}><sudoku-board-cell-component cell={this.board.cells[49]} candidates={this.board.cells[49].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(50)} onClick={() => this.cellSelectedHandler(50)}><sudoku-board-cell-component cell={this.board.cells[50]} candidates={this.board.cells[50].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(51)} onClick={() => this.cellSelectedHandler(51)}><sudoku-board-cell-component cell={this.board.cells[51]} candidates={this.board.cells[51].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(52)} onClick={() => this.cellSelectedHandler(52)}><sudoku-board-cell-component cell={this.board.cells[52]} candidates={this.board.cells[52].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(53)} onClick={() => this.cellSelectedHandler(53)}><sudoku-board-cell-component cell={this.board.cells[53]} candidates={this.board.cells[53].candidates}></sudoku-board-cell-component></div>
                </div>

                <div class="row">
                    <div class={this.returnClassForTheCell(54)} onClick={() => this.cellSelectedHandler(54)}><sudoku-board-cell-component cell={this.board.cells[54]} candidates={this.board.cells[54].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(55)} onClick={() => this.cellSelectedHandler(55)}><sudoku-board-cell-component cell={this.board.cells[55]} candidates={this.board.cells[55].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(56)} onClick={() => this.cellSelectedHandler(56)}><sudoku-board-cell-component cell={this.board.cells[56]} candidates={this.board.cells[56].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(57)} onClick={() => this.cellSelectedHandler(57)}><sudoku-board-cell-component cell={this.board.cells[57]} candidates={this.board.cells[57].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(58)} onClick={() => this.cellSelectedHandler(58)}><sudoku-board-cell-component cell={this.board.cells[58]} candidates={this.board.cells[58].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(59)} onClick={() => this.cellSelectedHandler(59)}><sudoku-board-cell-component cell={this.board.cells[59]} candidates={this.board.cells[59].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(60)} onClick={() => this.cellSelectedHandler(60)}><sudoku-board-cell-component cell={this.board.cells[60]} candidates={this.board.cells[60].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(61)} onClick={() => this.cellSelectedHandler(61)}><sudoku-board-cell-component cell={this.board.cells[61]} candidates={this.board.cells[61].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(62)} onClick={() => this.cellSelectedHandler(62)}><sudoku-board-cell-component cell={this.board.cells[62]} candidates={this.board.cells[62].candidates}></sudoku-board-cell-component></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(63)} onClick={() => this.cellSelectedHandler(63)}><sudoku-board-cell-component cell={this.board.cells[63]} candidates={this.board.cells[63].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(64)} onClick={() => this.cellSelectedHandler(64)}><sudoku-board-cell-component cell={this.board.cells[64]} candidates={this.board.cells[64].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(65)} onClick={() => this.cellSelectedHandler(65)}><sudoku-board-cell-component cell={this.board.cells[65]} candidates={this.board.cells[65].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(66)} onClick={() => this.cellSelectedHandler(66)}><sudoku-board-cell-component cell={this.board.cells[66]} candidates={this.board.cells[66].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(67)} onClick={() => this.cellSelectedHandler(67)}><sudoku-board-cell-component cell={this.board.cells[67]} candidates={this.board.cells[67].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(68)} onClick={() => this.cellSelectedHandler(68)}><sudoku-board-cell-component cell={this.board.cells[68]} candidates={this.board.cells[68].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(69)} onClick={() => this.cellSelectedHandler(69)}><sudoku-board-cell-component cell={this.board.cells[69]} candidates={this.board.cells[69].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(70)} onClick={() => this.cellSelectedHandler(70)}><sudoku-board-cell-component cell={this.board.cells[70]} candidates={this.board.cells[70].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(71)} onClick={() => this.cellSelectedHandler(71)}><sudoku-board-cell-component cell={this.board.cells[71]} candidates={this.board.cells[71].candidates}></sudoku-board-cell-component></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(72)} onClick={() => this.cellSelectedHandler(72)}><sudoku-board-cell-component cell={this.board.cells[72]} candidates={this.board.cells[72].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(73)} onClick={() => this.cellSelectedHandler(73)}><sudoku-board-cell-component cell={this.board.cells[73]} candidates={this.board.cells[73].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(74)} onClick={() => this.cellSelectedHandler(74)}><sudoku-board-cell-component cell={this.board.cells[74]} candidates={this.board.cells[74].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(75)} onClick={() => this.cellSelectedHandler(75)}><sudoku-board-cell-component cell={this.board.cells[75]} candidates={this.board.cells[75].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(76)} onClick={() => this.cellSelectedHandler(76)}><sudoku-board-cell-component cell={this.board.cells[76]} candidates={this.board.cells[76].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(77)} onClick={() => this.cellSelectedHandler(77)}><sudoku-board-cell-component cell={this.board.cells[77]} candidates={this.board.cells[77].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(78)} onClick={() => this.cellSelectedHandler(78)}><sudoku-board-cell-component cell={this.board.cells[78]} candidates={this.board.cells[78].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(79)} onClick={() => this.cellSelectedHandler(79)}><sudoku-board-cell-component cell={this.board.cells[79]} candidates={this.board.cells[79].candidates}></sudoku-board-cell-component></div>
                    <div class={this.returnClassForTheCell(80)} onClick={() => this.cellSelectedHandler(80)}><sudoku-board-cell-component cell={this.board.cells[80]} candidates={this.board.cells[80].candidates}></sudoku-board-cell-component></div>
                </div>
            </div>
        );
    }
}


