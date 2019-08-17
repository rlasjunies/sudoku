import { newE2EPage } from '@stencil/core/testing';

it('should create cell, empty by default', async () => {
  const page = await newE2EPage();

  await page.setContent(`
    <sudoku-board-cell-component></sudoku-board-cell-component>
  `);

  // const ionChange = await page.spyOnEvent('ionChange');

  const cell = await page.find('sudoku-board-cell-component');

  expect(cell).toHaveClasses(['hydrated']);

  // expect(cell).not.toHaveClass('toggle-checked');

  // cell.setProperty('checked', true);

  // await page.waitForChanges();

  // expect(toggle).toHaveClass('toggle-checked');

  // expect(ionChange).toHaveReceivedEventDetail({
  //   checked: true,
  //   value: 'on'
  // });
});