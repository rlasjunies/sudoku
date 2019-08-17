import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('key-board e2e tests cases', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({ html: `<key-board></key-board>` });
    element = await page.find('key-board');
  });

  it('renders', async () => {
    // await page.setContent('<key-board></key-board>');
    // const element = await page.find('key-board');
    expect(element).toBeDefined();
    expect(element).toHaveClass('hydrated');
  });

  /**
   * 
   * DO NOT SUCCEEDED TO DO find all method !!??!!??
   * 
   * 
   * 
   */
  // it('contains 2 rows', async () => {

  //   const elements = await page.findAll('key-board >>> .row');
  //   expect(elements.length).toEqual(1);
  // });
  // it('contains 2 rows', async () => {

  //   const elements = await page.findAll('key-board div');
  //   expect(elements.length).toEqual(1);
  // });
  // it('contains 2 rows', async () => {

  //   const elements = await page.findAll('key-board >>> row');
  //   expect(elements.length).toEqual(1);
  // });

  // it('contains z rows', async () => {
  //   // const subElements = await page.findAll("key-board >>> key-board-cell");
    
  //   const elements = await page.findAll('key-board >>> div');
  //   expect(elements.length).toEqual(1);
  // });
  // it('contains z rows', async () => {
  //   const elements = await page.findAll('key-board >>> key-board-cell');
  //   expect(elements.length).toEqual(1);
  // });
  // it('contains z rows', async () => {
  //   const elements = await page.findAll('div');
  //   expect(elements.length).toEqual(1);
  // });

  // it('contains z rows', async () => {
  //   const elements = await page.findAll('div.row');
  //   expect(elements.length).toEqual(1);
  // });

  
  // it('the 5th element should contain value 5', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent('<board></board>');

  //   // const elements = await page.$$('board');
  //   // expect(elements[5].).toEqual('5');
  // });
});
