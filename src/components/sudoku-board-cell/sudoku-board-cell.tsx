import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'sudoku-board-cell',
    styleUrl: 'sudoku-board-cell.css',
    shadow: true
})
export class SudokuBoardCell {

    @Prop() candidates: boolean[] = Array(9);
    // @Watch('candidates')
    // watchHandler(newValue) {
    //     console.log('The value of candidates is: ', newValue);
    // }
    @Prop() value: number = null;

    isThereValueDefined():boolean{
        return this.value ? false : true;
    }

    render() {
        // console.log(`this.candidate dans cell render`,this.candidates);

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
                <div class="sudoku-board-cell" ><div class="value">{this.value}</div></div>
            )
        }
    }
}


