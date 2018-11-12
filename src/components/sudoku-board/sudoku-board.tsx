import { Component, EventEmitter, Event, Element, Prop } from '@stencil/core';
import { colOfCellNumber, rowOfCellNumber, zoneOfCellNumber } from "../../services/sudoku/sudoku";

@Component({
    tag: 'sudoku-board',
    styleUrl: 'sudoku-board.css',
    shadow: true
})
export class SudokuBoard {
    @Element() element: HTMLSudokuBoardElement;
    @Event() cellSelection: EventEmitter;

    @Prop() board: number[] = Array(81);

    @Prop() cellSelected: number = -1;

    @Prop() incorrectCells: number[] = [];

    cellSelectedHandler(cell: number) {
        this.cellSelection.emit(cell);
    }

    returnClassForTheCell(cell: number) {
        const colOfCell = colOfCellNumber(cell);
        const rowOfCell = rowOfCellNumber(cell);
        const zoneOfCell = zoneOfCellNumber(cell);

        const colOfCellSelected = colOfCellNumber(this.cellSelected);
        const rowOfCellSelected = rowOfCellNumber(this.cellSelected);
        const zoneOfCellSelected = zoneOfCellNumber(this.cellSelected);

        const isIncorrectCell = this.incorrectCells.lastIndexOf(cell) !== -1;
        const incorrectClass = isIncorrectCell ? " incorrect " : "";
        console.log(`cell:${cell} - selected:${this.cellSelected} - ${((this.cellSelected !== -1) && (this.cellSelected !== null))}`);
        const cellSelectedClass = ((this.cellSelected !== -1) && (this.cellSelected !== null)) && 
            ((this.cellSelected === cell) ||
            (colOfCell === colOfCellSelected) ||
            (rowOfCell === rowOfCellSelected) ||
            (zoneOfCell === zoneOfCellSelected)) ? " selected " : "";

        return `cell` +
            ` cell${cell} ` +
            ` row${rowOfCell} ` +
            ` column${colOfCell} ` +
            ` zone${zoneOfCell}` +
            cellSelectedClass +
            incorrectClass;
    }

    render() {
        return (
            <div class="sudoku-board">
                <div class="row">
                    <div class={this.returnClassForTheCell(0)} onClick={() => this.cellSelectedHandler(0)}><div class="value">{this.board[0]}</div></div>
                    <div class={this.returnClassForTheCell(1)} onClick={() => this.cellSelectedHandler(1)}><div class="value">{this.board[1]}</div></div>
                    <div class={this.returnClassForTheCell(2)} onClick={() => this.cellSelectedHandler(2)}><div class="value">{this.board[2]}</div></div>
                    <div class={this.returnClassForTheCell(3)} onClick={() => this.cellSelectedHandler(3)}><div class="value">{this.board[3]}</div></div>
                    <div class={this.returnClassForTheCell(4)} onClick={() => this.cellSelectedHandler(4)}><div class="value">{this.board[4]}</div></div>
                    <div class={this.returnClassForTheCell(5)} onClick={() => this.cellSelectedHandler(5)}><div class="value">{this.board[5]}</div></div>
                    <div class={this.returnClassForTheCell(6)} onClick={() => this.cellSelectedHandler(6)}><div class="value">{this.board[6]}</div></div>
                    <div class={this.returnClassForTheCell(7)} onClick={() => this.cellSelectedHandler(7)}><div class="value">{this.board[7]}</div></div>
                    <div class={this.returnClassForTheCell(8)} onClick={() => this.cellSelectedHandler(8)}><div class="value">{this.board[8]}</div></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(9)} onClick={() => this.cellSelectedHandler(9)}><div class="value">{this.board[9]}</div></div>
                    <div class={this.returnClassForTheCell(10)} onClick={() => this.cellSelectedHandler(10)}><div class="value">{this.board[10]}</div></div>
                    <div class={this.returnClassForTheCell(11)} onClick={() => this.cellSelectedHandler(11)}><div class="value">{this.board[11]}</div></div>
                    <div class={this.returnClassForTheCell(12)} onClick={() => this.cellSelectedHandler(12)}><div class="value">{this.board[12]}</div></div>
                    <div class={this.returnClassForTheCell(13)} onClick={() => this.cellSelectedHandler(13)}><div class="value">{this.board[13]}</div></div>
                    <div class={this.returnClassForTheCell(14)} onClick={() => this.cellSelectedHandler(14)}><div class="value">{this.board[14]}</div></div>
                    <div class={this.returnClassForTheCell(15)} onClick={() => this.cellSelectedHandler(15)}><div class="value">{this.board[15]}</div></div>
                    <div class={this.returnClassForTheCell(16)} onClick={() => this.cellSelectedHandler(16)}><div class="value">{this.board[16]}</div></div>
                    <div class={this.returnClassForTheCell(17)} onClick={() => this.cellSelectedHandler(17)}><div class="value">{this.board[17]}</div></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(18)} onClick={() => this.cellSelectedHandler(18)}><div class="value">{this.board[18]}</div></div>
                    <div class={this.returnClassForTheCell(19)} onClick={() => this.cellSelectedHandler(19)}><div class="value">{this.board[19]}</div></div>
                    <div class={this.returnClassForTheCell(20)} onClick={() => this.cellSelectedHandler(20)}><div class="value">{this.board[20]}</div></div>
                    <div class={this.returnClassForTheCell(21)} onClick={() => this.cellSelectedHandler(21)}><div class="value">{this.board[21]}</div></div>
                    <div class={this.returnClassForTheCell(22)} onClick={() => this.cellSelectedHandler(22)}><div class="value">{this.board[22]}</div></div>
                    <div class={this.returnClassForTheCell(23)} onClick={() => this.cellSelectedHandler(23)}><div class="value">{this.board[23]}</div></div>
                    <div class={this.returnClassForTheCell(24)} onClick={() => this.cellSelectedHandler(24)}><div class="value">{this.board[24]}</div></div>
                    <div class={this.returnClassForTheCell(25)} onClick={() => this.cellSelectedHandler(25)}><div class="value">{this.board[25]}</div></div>
                    <div class={this.returnClassForTheCell(26)} onClick={() => this.cellSelectedHandler(26)}><div class="value">{this.board[26]}</div></div>
                </div>

                <div class="row">
                    <div class={this.returnClassForTheCell(27)} onClick={() => this.cellSelectedHandler(27)}><div class="value">{this.board[27]}</div></div>
                    <div class={this.returnClassForTheCell(28)} onClick={() => this.cellSelectedHandler(28)}><div class="value">{this.board[28]}</div></div>
                    <div class={this.returnClassForTheCell(29)} onClick={() => this.cellSelectedHandler(29)}><div class="value">{this.board[29]}</div></div>
                    <div class={this.returnClassForTheCell(30)} onClick={() => this.cellSelectedHandler(30)}><div class="value">{this.board[30]}</div></div>
                    <div class={this.returnClassForTheCell(31)} onClick={() => this.cellSelectedHandler(31)}><div class="value">{this.board[31]}</div></div>
                    <div class={this.returnClassForTheCell(32)} onClick={() => this.cellSelectedHandler(32)}><div class="value">{this.board[32]}</div></div>
                    <div class={this.returnClassForTheCell(33)} onClick={() => this.cellSelectedHandler(33)}><div class="value">{this.board[33]}</div></div>
                    <div class={this.returnClassForTheCell(34)} onClick={() => this.cellSelectedHandler(34)}><div class="value">{this.board[34]}</div></div>
                    <div class={this.returnClassForTheCell(35)} onClick={() => this.cellSelectedHandler(35)}><div class="value">{this.board[35]}</div></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(36)} onClick={() => this.cellSelectedHandler(36)}><div class="value">{this.board[36]}</div></div>
                    <div class={this.returnClassForTheCell(37)} onClick={() => this.cellSelectedHandler(37)}><div class="value">{this.board[37]}</div></div>
                    <div class={this.returnClassForTheCell(38)} onClick={() => this.cellSelectedHandler(38)}><div class="value">{this.board[38]}</div></div>
                    <div class={this.returnClassForTheCell(39)} onClick={() => this.cellSelectedHandler(39)}><div class="value">{this.board[39]}</div></div>
                    <div class={this.returnClassForTheCell(40)} onClick={() => this.cellSelectedHandler(40)}><div class="value">{this.board[40]}</div></div>
                    <div class={this.returnClassForTheCell(41)} onClick={() => this.cellSelectedHandler(41)}><div class="value">{this.board[41]}</div></div>
                    <div class={this.returnClassForTheCell(42)} onClick={() => this.cellSelectedHandler(42)}><div class="value">{this.board[42]}</div></div>
                    <div class={this.returnClassForTheCell(43)} onClick={() => this.cellSelectedHandler(43)}><div class="value">{this.board[43]}</div></div>
                    <div class={this.returnClassForTheCell(44)} onClick={() => this.cellSelectedHandler(44)}><div class="value">{this.board[44]}</div></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(45)} onClick={() => this.cellSelectedHandler(45)}><div class="value">{this.board[45]}</div></div>
                    <div class={this.returnClassForTheCell(46)} onClick={() => this.cellSelectedHandler(46)}><div class="value">{this.board[46]}</div></div>
                    <div class={this.returnClassForTheCell(47)} onClick={() => this.cellSelectedHandler(47)}><div class="value">{this.board[47]}</div></div>
                    <div class={this.returnClassForTheCell(48)} onClick={() => this.cellSelectedHandler(48)}><div class="value">{this.board[48]}</div></div>
                    <div class={this.returnClassForTheCell(49)} onClick={() => this.cellSelectedHandler(49)}><div class="value">{this.board[49]}</div></div>
                    <div class={this.returnClassForTheCell(50)} onClick={() => this.cellSelectedHandler(50)}><div class="value">{this.board[50]}</div></div>
                    <div class={this.returnClassForTheCell(51)} onClick={() => this.cellSelectedHandler(51)}><div class="value">{this.board[51]}</div></div>
                    <div class={this.returnClassForTheCell(52)} onClick={() => this.cellSelectedHandler(52)}><div class="value">{this.board[52]}</div></div>
                    <div class={this.returnClassForTheCell(53)} onClick={() => this.cellSelectedHandler(53)}><div class="value">{this.board[53]}</div></div>
                </div>

                <div class="row">
                    <div class={this.returnClassForTheCell(54)} onClick={() => this.cellSelectedHandler(54)}><div class="value">{this.board[54]}</div></div>
                    <div class={this.returnClassForTheCell(55)} onClick={() => this.cellSelectedHandler(55)}><div class="value">{this.board[55]}</div></div>
                    <div class={this.returnClassForTheCell(56)} onClick={() => this.cellSelectedHandler(56)}><div class="value">{this.board[56]}</div></div>
                    <div class={this.returnClassForTheCell(57)} onClick={() => this.cellSelectedHandler(57)}><div class="value">{this.board[57]}</div></div>
                    <div class={this.returnClassForTheCell(58)} onClick={() => this.cellSelectedHandler(58)}><div class="value">{this.board[58]}</div></div>
                    <div class={this.returnClassForTheCell(59)} onClick={() => this.cellSelectedHandler(59)}><div class="value">{this.board[59]}</div></div>
                    <div class={this.returnClassForTheCell(60)} onClick={() => this.cellSelectedHandler(60)}><div class="value">{this.board[60]}</div></div>
                    <div class={this.returnClassForTheCell(61)} onClick={() => this.cellSelectedHandler(61)}><div class="value">{this.board[61]}</div></div>
                    <div class={this.returnClassForTheCell(62)} onClick={() => this.cellSelectedHandler(62)}><div class="value">{this.board[62]}</div></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(63)} onClick={() => this.cellSelectedHandler(63)}><div class="value">{this.board[63]}</div></div>
                    <div class={this.returnClassForTheCell(64)} onClick={() => this.cellSelectedHandler(64)}><div class="value">{this.board[64]}</div></div>
                    <div class={this.returnClassForTheCell(65)} onClick={() => this.cellSelectedHandler(65)}><div class="value">{this.board[65]}</div></div>
                    <div class={this.returnClassForTheCell(66)} onClick={() => this.cellSelectedHandler(66)}><div class="value">{this.board[66]}</div></div>
                    <div class={this.returnClassForTheCell(67)} onClick={() => this.cellSelectedHandler(67)}><div class="value">{this.board[67]}</div></div>
                    <div class={this.returnClassForTheCell(68)} onClick={() => this.cellSelectedHandler(68)}><div class="value">{this.board[68]}</div></div>
                    <div class={this.returnClassForTheCell(69)} onClick={() => this.cellSelectedHandler(69)}><div class="value">{this.board[69]}</div></div>
                    <div class={this.returnClassForTheCell(70)} onClick={() => this.cellSelectedHandler(70)}><div class="value">{this.board[70]}</div></div>
                    <div class={this.returnClassForTheCell(71)} onClick={() => this.cellSelectedHandler(71)}><div class="value">{this.board[71]}</div></div>
                </div>
                <div class="row">
                    <div class={this.returnClassForTheCell(72)} onClick={() => this.cellSelectedHandler(72)}><div class="value">{this.board[72]}</div></div>
                    <div class={this.returnClassForTheCell(73)} onClick={() => this.cellSelectedHandler(73)}><div class="value">{this.board[73]}</div></div>
                    <div class={this.returnClassForTheCell(74)} onClick={() => this.cellSelectedHandler(74)}><div class="value">{this.board[74]}</div></div>
                    <div class={this.returnClassForTheCell(75)} onClick={() => this.cellSelectedHandler(75)}><div class="value">{this.board[75]}</div></div>
                    <div class={this.returnClassForTheCell(76)} onClick={() => this.cellSelectedHandler(76)}><div class="value">{this.board[76]}</div></div>
                    <div class={this.returnClassForTheCell(77)} onClick={() => this.cellSelectedHandler(77)}><div class="value">{this.board[77]}</div></div>
                    <div class={this.returnClassForTheCell(78)} onClick={() => this.cellSelectedHandler(78)}><div class="value">{this.board[78]}</div></div>
                    <div class={this.returnClassForTheCell(79)} onClick={() => this.cellSelectedHandler(79)}><div class="value">{this.board[79]}</div></div>
                    <div class={this.returnClassForTheCell(80)} onClick={() => this.cellSelectedHandler(80)}><div class="value">{this.board[80]}</div></div>
                </div>
            </div>
        );
    }
}


