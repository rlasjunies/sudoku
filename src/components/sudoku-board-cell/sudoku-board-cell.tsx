import { Component, Prop } from '@stencil/core';
import { SudokuBoardCell } from "../../services/sudoku/sudoku";

@Component({
    tag: 'sudoku-board-cell-component',
    styleUrl: 'sudoku-board-cell.css',
    shadow: true
})
export class SudokuBoardCellComponent {

    @Prop() candidates: boolean[] = Array(8);
    @Prop() cell: SudokuBoardCell = null;

    isThereValueDefined():boolean{
        return this.cell.value ? false : true;
    }

    render() {
        if (this.isThereValueDefined() ) {
            // console.log(`draft value:[${this.value}] -  ${this.candidates}`);
            return (
                <div class="sudoku-board-cell-draft">
                    <div class="row row0">
                        <div class=""><div class="draft">{this.candidates[0]? "1" : ""}</div></div>
                        <div class="column1"><div class="draft">{this.candidates[1]?"2" : ""}</div></div>
                        <div class=""><div class="draft">{this.candidates[2] ? "3" : ""}</div></div>
                    </div>
                    <div class="row row1">
                        <div class=""><div class="draft">{this.candidates[3]? "4" : ""}</div></div>
                        <div class="column1"><div class="draft">{this.candidates[4]? "5" : ""}</div></div>
                        <div class=""><div class="draft">{this.candidates[5]? "6" : ""}</div></div>
                    </div>
                    <div class="row row2">
                        <div class=""><div class="draft">{this.candidates[6]? "7" : ""}</div></div>
                        <div class="column1"><div class="draft">{this.candidates[7]? "8" : ""}</div></div>
                        <div class=""><div class="draft">{this.candidates[8]? "9" : ""}</div></div>
                    </div>
                </div>)
        } else {
            // console.log(`value:${this.value} -  ${this.candidates}`);
            return (
                <div class="sudoku-board-cell" ><div class={this.cell.initialeValue === true ? "value initialvalue" : "value"}>{this.cell.value}{this.cell.initialeValue}</div></div>
            )
        }
    }
}


