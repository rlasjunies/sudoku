import { blockOfColRow } from "services/sudoku/sudoku";

export function chenillardNorth(element: HTMLSudokuBoardComponentElement, col: number, row: number, block: number, stayInCurrentBlock: boolean, index: number) {

  // highlightTheCellForChenillard
  const cell = element.querySelectorAll(`.row${row}.column${col}`);
  addRemoveChenillardClassToElement(cell[0], index);

  // north increment
  // leave if reach limit of the board
  row -= 1;
  if (row === -1) return

  // are we still in the same block?
  // leave if not in same block and request to stay in same block
  const inSameBlock = block === blockOfColRow(col, row);
  if (stayInCurrentBlock && !inSameBlock) return;

  // go to next cell to highlight
  // incrementing the index
  index += 1;
  chenillardNorth(element, col, row, block, stayInCurrentBlock, index);
}

export function chenillardSouth(element: HTMLSudokuBoardComponentElement, col: number, row: number, block: number, stayInCurrentBlock: boolean, index: number) {


  // highlightTheCellForChenillard
  const cell = element.querySelectorAll(`.row${row}.column${col}`);
  addRemoveChenillardClassToElement(cell[0], index);

  // north increment
  // leave if reach limit of the board
  row += 1;
  if (row === 9) return

  // are we still in the same block?
  // leave if not in same block and request to stay in same block
  const inSameBlock = block === blockOfColRow(col, row);
  if (stayInCurrentBlock && !inSameBlock) return;

  // go to next cell to highlight
  // incrementing the index
  index += 1;
  chenillardSouth(element, col, row, block, stayInCurrentBlock, index);
}

export function chenillardWest(element: HTMLSudokuBoardComponentElement, col: number, row: number, block: number, stayInCurrentBlock: boolean, index: number) {

  // highlightTheCellForChenillard
  const cell = element.querySelectorAll(`.row${row}.column${col}`);
  addRemoveChenillardClassToElement(cell[0], index);

  // north increment
  // leave if reach limit of the board
  col -= 1;
  if (col === -1) return

  // are we still in the same block?
  // leave if not in same block and request to stay in same block
  const inSameBlock = block === blockOfColRow(col, row);
  if (stayInCurrentBlock && !inSameBlock) return;

  // go to next cell to highlight
  // incrementing the index
  index += 1;
  chenillardWest(element, col, row, block, stayInCurrentBlock, index);
}

export function chenillardEast(element: HTMLSudokuBoardComponentElement, col: number, row: number, block: number, stayInCurrentBlock: boolean, index: number) {

  // highlightTheCellForChenillard
  const cell = element.querySelectorAll(`.row${row}.column${col}`);
  addRemoveChenillardClassToElement(cell[0], index);

  // north increment
  // leave if reach limit of the board
  col += 1;
  if (col === 9) return

  // are we still in the same block?
  // leave if not in same block and request to stay in same block
  const inSameBlock = block === blockOfColRow(col, row);
  if (stayInCurrentBlock && !inSameBlock) return;

  // go to next cell to highlight
  // incrementing the index
  index += 1;
  chenillardEast(element, col, row, block, stayInCurrentBlock, index);
}


export function chenillardNorthEast(element: HTMLSudokuBoardComponentElement, col: number, row: number, block: number, stayInCurrentBlock: boolean, index: number) {

  // highlightTheCellForChenillard
  const cell = element.querySelectorAll(`.row${row}.column${col}`);
  addRemoveChenillardClassToElement(cell[0], index);

  // north increment
  // leave if reach limit of the board
  col += 1;
  row -= 1;
  if (col === 9) return
  if (row === -1) return

  // are we still in the same block?
  // leave if not in same block and request to stay in same block
  const inSameBlock = block === blockOfColRow(col, row);
  if (stayInCurrentBlock && !inSameBlock) return;

  // go to next cell to highlight
  // incrementing the index
  index += 1;
  chenillardNorth(element, col, row, block, stayInCurrentBlock, index);
  chenillardEast(element, col, row, block, stayInCurrentBlock, index);
  chenillardNorthEast(element, col, row, block, stayInCurrentBlock, index);
}
export function chenillardSouthEast(element: HTMLSudokuBoardComponentElement, col: number, row: number, block: number, stayInCurrentBlock: boolean, index: number) {

  // highlightTheCellForChenillard
  const cell = element.querySelectorAll(`.row${row}.column${col}`);
  addRemoveChenillardClassToElement(cell[0], index);

  // north increment
  // leave if reach limit of the board
  col += 1;
  row += 1;
  if (col === 9) return
  if (row === 9) return

  // are we still in the same block?
  // leave if not in same block and request to stay in same block
  const inSameBlock = block === blockOfColRow(col, row);
  if (stayInCurrentBlock && !inSameBlock) return;

  // go to next cell to highlight
  // incrementing the index
  index += 1;
  chenillardSouth(element, col, row, block, stayInCurrentBlock, index);
  chenillardEast(element, col, row, block, stayInCurrentBlock, index);
  chenillardSouthEast(element, col, row, block, stayInCurrentBlock, index);
}

export function chenillardSouthWest(element: HTMLSudokuBoardComponentElement, col: number, row: number, block: number, stayInCurrentBlock: boolean, index: number) {

  // highlightTheCellForChenillard
  const cell = element.querySelectorAll(`.row${row}.column${col}`);
  addRemoveChenillardClassToElement(cell[0], index);

  // north increment
  // leave if reach limit of the board
  col -= 1;
  row += 1;
  if (col === -1) return
  if (row === 9) return

  // are we still in the same block?
  // leave if not in same block and request to stay in same block
  const inSameBlock = block === blockOfColRow(col, row);
  if (stayInCurrentBlock && !inSameBlock) return;

  // go to next cell to highlight
  // incrementing the index
  index += 1;
  chenillardSouth(element, col, row, block, stayInCurrentBlock, index);
  chenillardWest(element, col, row, block, stayInCurrentBlock, index);
  chenillardSouthWest(element, col, row, block, stayInCurrentBlock, index);
}

export function chenillardNorthWest(element: HTMLSudokuBoardComponentElement, col: number, row: number, block: number, stayInCurrentBlock: boolean, index: number) {

  // highlightTheCellForChenillard
  const cell = element.querySelectorAll(`.row${row}.column${col}`);
  addRemoveChenillardClassToElement(cell[0], index);

  // north increment
  // leave if reach limit of the board
  col -= 1;
  row -= 1;
  if (col === -1) return
  if (row === -1) return

  // are we still in the same block?
  // leave if not in same block and request to stay in same block
  const inSameBlock = block === blockOfColRow(col, row);
  if (stayInCurrentBlock && !inSameBlock) return;

  // go to next cell to highlight
  // incrementing the index
  index += 1;
  chenillardNorth(element, col, row, block, stayInCurrentBlock, index);
  chenillardWest(element, col, row, block, stayInCurrentBlock, index);
  chenillardNorthWest(element, col, row, block, stayInCurrentBlock, index);
}



function addRemoveChenillardClassToElement(element: Element, delayCoeff: number) {
  const delay = delayCoeff * 100;
  setTimeout(() => {
    element.classList.add("chenillardCol");
    setTimeout(() => {
      element.classList.remove("chenillardCol");
    }, 100);
  }, delay)
}