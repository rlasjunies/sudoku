import { newE2EPage } from '@stencil/core/testing';

describe('key-board', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<key-board></key-board>');

    const element = await page.find('key-board');
    expect(element).toHaveClass('hydrated');
  });

  it('contains 9 child nodes', async () => {
    const page = await newE2EPage();
    await page.setContent('<key-board></key-board>');

    const element = await page.find('key-board');
    expect(element).toBeDefined();
    // expect(element.shadowRoot).toEqualHtml('<div></div>');

    const elements = await page.findAll("key-board");
    expect(elements.length).toEqual(1);

    const subElements = await page.findAll("key-board >>> key-board-cell");
    // const subElements = await page.findAll("app-root >>> key-board >>> key-board-cell");
    expect(subElements.length).toEqual(9);
  });

  // it('the 5th element should contain value 5', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent('<board></board>');

  //   // const elements = await page.$$('board');
  //   // expect(elements[5].).toEqual('5');
  // });
});
