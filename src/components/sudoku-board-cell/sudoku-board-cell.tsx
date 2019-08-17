import { Component, Prop, h } from '@stencil/core';
import { SudokuBoardCell } from "../../services/sudoku/sudoku";

@Component({
    tag: 'sudoku-board-cell-component',
    styleUrl: 'sudoku-board-cell.css',
    // shadow: true
})
export class SudokuBoardCellComponent {

    @Prop() candidates: boolean[] = Array(8);
    @Prop() cell: SudokuBoardCell = null;

    isThereValueDefined(): boolean {
        return this.cell.value ? true : false;
    }

    isThereDraftValues(): boolean {
        return this.cell.drafted.find(val => val !== null);
    }

    possibleValue(value: number): string {
        const possibleValue = this.cell.calculatedPossibleValues.find(possibleValue => possibleValue === value);
        // console.log(`POssibleValues:`,this.cell.possibleValues);
        return possibleValue ? possibleValue.toString() : "";
    }

    renderTypedValueOrSeedValue() {
        return (
            <div class="sudoku-board-cell" >
                <div class={this.cell.seed === true ? "value initialvalue" : "value"}>
                    {this.cell.value}{this.cell.seed}
                </div>
            </div>
        )
    }
    renderDraftedValues(){
        return (
            <div class="sudoku-board-cell-draft">
                <div class="rowdraft">
                    <div class="celldraft">{this.candidates[0] ? "1" : ""}</div>
                    <div class="celldraft">{this.candidates[1] ? "2" : ""}</div>
                    <div class="celldraft">{this.candidates[2] ? "3" : ""}</div>
                </div>
                <div class="rowdraft">
                    <div class="celldraft">{this.candidates[3] ? "4" : ""}</div>
                    <div class="celldraft">{this.candidates[4] ? "5" : ""}</div>
                    <div class="celldraft">{this.candidates[5] ? "6" : ""}</div>
                </div>
                <div class="rowdraft">
                    <div class="celldraft">{this.candidates[6] ? "7" : ""}</div>
                    <div class="celldraft">{this.candidates[7] ? "8" : ""}</div>
                    <div class="celldraft">{this.candidates[8] ? "9" : ""}</div>
                </div>
            </div>)
    }

    renderPossibleValues(){
        return (
            <div class="sudoku-board-cell-draft">
                <div class="rowdraft">
                    <div class="possibleValue">{this.possibleValue(1)}</div>
                    <div class="possibleValue">{this.possibleValue(2)}</div>
                    <div class="possibleValue">{this.possibleValue(3)}</div>
                </div>
                <div class="rowdraft">
                    <div class="possibleValue">{this.possibleValue(4)}</div>
                    <div class="possibleValue">{this.possibleValue(5)}</div>
                    <div class="possibleValue">{this.possibleValue(6)}</div>
                </div>
                <div class="rowdraft">
                    <div class="possibleValue">{this.possibleValue(7)}</div>
                    <div class="possibleValue">{this.possibleValue(8)}</div>
                    <div class="possibleValue">{this.possibleValue(9)}</div>
                </div>
            </div>)
    }
    render() {
        if (this.isThereValueDefined()) {
            // console.log(`value:${this.cell.value} -  ${this.candidates}`);
            return this.renderTypedValueOrSeedValue();
        } else {
            // console.log(`draft value:[${this.value}] -  ${this.candidates}`);
            if (this.isThereDraftValues()) {
                return this.renderDraftedValues();
            } else {
                return this.renderPossibleValues();
            }
        }
    }
}


