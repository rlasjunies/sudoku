import { initializeSudokuBoard } from "./sudoku";

// *******************
// *1: : |9:2: |4: :5*
// *3:9:5|1:6:4| : : *
// *7: :4|3:5:8| :9:6*
// *-----------------*
// *9:1:7|4: : | :5:8*
// *5:6:2|8:7: |3:4:1*
// *4:3:8|2: : |6:7:9*
// *-----------------*
// *2:7:3|5:8:1|9:6:4*
// *8: :1| :9:3| :2:7*
// *6:5:9|7:4:2|8:1: *
// *******************

export let board1 = initializeSudokuBoard();
board1.cells[0].value = 1;
board1.cells[3].value = 9;
board1.cells[4].value = 2;
board1.cells[6].value = 4;
board1.cells[8].value = 5;

board1.cells[9].value = 3;
board1.cells[10].value = 9;
board1.cells[11].value = 5;
board1.cells[12].value = 1;
board1.cells[13].value = 6;
board1.cells[14].value = 4;



