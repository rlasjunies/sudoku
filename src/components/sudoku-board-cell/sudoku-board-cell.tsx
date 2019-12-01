import { Component, Prop, h } from '@stencil/core';
import { SudokuBoardCell } from "../../services/sudoku/sudoku";
const BOARD_CELL_DEV_MODE = ['%c[BOARD_CELL]', 'color:#ff11ff;font-weight: bold'];

@Component({
    tag: 'sudoku-board-cell-component',
    styleUrl: 'sudoku-board-cell.css',
    // shadow: true
})
export class SudokuBoardCellComponent {

    @Prop() drafted: boolean[] = Array(9);
    @Prop() cell: SudokuBoardCell = null;


    onClickRippleEffect(mouseEvent: MouseEvent) {
        console.debug(...BOARD_CELL_DEV_MODE, `onClickRippleEffect-event:${mouseEvent}`);
        const $cell = (mouseEvent.target as HTMLElement).closest("sudoku-board-cell-component");

        const rect = $cell.getBoundingClientRect();
        let $ripple = $cell.querySelector('.ripplex') as HTMLElement;
        if (!$ripple) {
            $ripple = document.createElement('span');
            $ripple.className = 'ripplex';
            $ripple.style.height = $ripple.style.width = Math.max(rect.width, rect.height) + 'px';
            $cell.appendChild($ripple);
        }

        $ripple.classList.remove('show');
        var top = mouseEvent.pageY - rect.top - $ripple.offsetHeight / 2 - document.body.scrollTop;
        var left = mouseEvent.pageX - rect.left - $ripple.offsetWidth / 2 - document.body.scrollLeft;
        $ripple.style.top = top + 'px';
        $ripple.style.left = left + 'px';

        $ripple.classList.add('show');
        setTimeout(function () {
            $ripple.remove();
        }, 500);
        return false;
    }

    isThereValueDefined(): boolean {
        return this.cell.value ? true : false;
    }

    isThereDraftValues(): boolean {
        // console.log(`drafted values?:${this.cell.drafted.find(val => val === true) || false}`,this.cell.drafted,)
        return this.cell.drafted.find(val => val === true);
    }

    possibleValue(value: number): string {
        const possibleValue = this.cell.calculatedPossibleValues.find(possibleValue => possibleValue === value);
        // console.log(`POssibleValues:`,this.cell.possibleValues);
        return possibleValue ? possibleValue.toString() : "";
    }

    renderTypedValueOrSeedValue() {
        return (
            <div class="sudoku-board-cell"
                onClick={(event: MouseEvent) => this.onClickRippleEffect(event)}>
                <ion-ripple-effect></ion-ripple-effect>
                <div class={this.cell.seed === true ? "value initialvalue" : "value"}>
                    {this.cell.value}{this.cell.seed}
                </div>
            </div>
        )
    }
    renderDraftedValues() {
        return (
            <div class="sudoku-board-cell-draft"
                onClick={(event: MouseEvent) => this.onClickRippleEffect(event)}>
                <div class="rowdraft">
                    <div class="celldraft">{this.drafted[0] ? "1" : ""}</div>
                    <div class="celldraft">{this.drafted[1] ? "2" : ""}</div>
                    <div class="celldraft">{this.drafted[2] ? "3" : ""}</div>
                </div>
                <div class="rowdraft">
                    <div class="celldraft">{this.drafted[3] ? "4" : ""}</div>
                    <div class="celldraft">{this.drafted[4] ? "5" : ""}</div>
                    <div class="celldraft">{this.drafted[5] ? "6" : ""}</div>
                </div>
                <div class="rowdraft">
                    <div class="celldraft">{this.drafted[6] ? "7" : ""}</div>
                    <div class="celldraft">{this.drafted[7] ? "8" : ""}</div>
                    <div class="celldraft">{this.drafted[8] ? "9" : ""}</div>
                </div>
            </div>)
    }

    renderPossibleValues() {
        return (
            <div class="sudoku-board-cell-draft"
                onClick={(event: MouseEvent) => this.onClickRippleEffect(event)}>
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
            // console.log(`value:${this.cell.value} -  ${this.drafted}`);
            return this.renderTypedValueOrSeedValue();
        } else {
            // console.log(`draft value:[${this.value}] -  ${this.drafted}`);
            if (this.isThereDraftValues()) {
                return this.renderDraftedValues();
            } else {
                return this.renderPossibleValues();
            }
        }
    }
}


