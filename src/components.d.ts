/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  SolutionsByRules,
  SudokuBoard,
  SudokuBoardCell,
  SudokuWizardConfiguration,
} from './services/sudoku/sudoku';


export namespace Components {

  interface AccButton {}
  interface AccButtonAttributes extends StencilHTMLAttributes {
    'onClick_'?: (event: CustomEvent) => void;
  }

  interface AccFlipbox {
    'flip': boolean;
  }
  interface AccFlipboxAttributes extends StencilHTMLAttributes {
    'flip'?: boolean;
  }

  interface AccSwitch {}
  interface AccSwitchAttributes extends StencilHTMLAttributes {
    'onSwitch'?: (event: CustomEvent) => void;
  }

  interface AccTimer {
    'time': number;
  }
  interface AccTimerAttributes extends StencilHTMLAttributes {
    'time'?: number;
  }

  interface KeyBoard3 {
    'hideClearKey': boolean;
    'hideUndoKey': boolean;
    'remainingNumbers': number[];
  }
  interface KeyBoard3Attributes extends StencilHTMLAttributes {
    'hideClearKey'?: boolean;
    'hideUndoKey'?: boolean;
    'onClearClicked'?: (event: CustomEvent) => void;
    'onDraftNumberClicked'?: (event: CustomEvent) => void;
    'onNumberClicked'?: (event: CustomEvent) => void;
    'onUndoClicked'?: (event: CustomEvent) => void;
    'remainingNumbers'?: number[];
  }

  interface SudokuBoardCellComponent {
    'candidates': boolean[];
    'cell': SudokuBoardCell;
  }
  interface SudokuBoardCellComponentAttributes extends StencilHTMLAttributes {
    'candidates'?: boolean[];
    'cell'?: SudokuBoardCell;
  }

  interface SudokuBoardComponent {
    'board': SudokuBoard;
    'boardSolved': boolean;
    'cellSelected': number;
    'incorrectCells': number[];
    'lastCellOfTheGame': number;
    'solutionsByRules': SolutionsByRules;
    'solvedBlock': number;
    'solvedCol': number;
    'solvedRow': number;
    'wizardConfiguration': SudokuWizardConfiguration;
  }
  interface SudokuBoardComponentAttributes extends StencilHTMLAttributes {
    'board'?: SudokuBoard;
    'boardSolved'?: boolean;
    'cellSelected'?: number;
    'incorrectCells'?: number[];
    'lastCellOfTheGame'?: number;
    'onCellSelection'?: (event: CustomEvent) => void;
    'solutionsByRules'?: SolutionsByRules;
    'solvedBlock'?: number;
    'solvedCol'?: number;
    'solvedRow'?: number;
    'wizardConfiguration'?: SudokuWizardConfiguration;
  }

  interface AccPage {
    'hide': () => void;
    'show': () => void;
  }
  interface AccPageAttributes extends StencilHTMLAttributes {}

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface CreateNewBoard {}
  interface CreateNewBoardAttributes extends StencilHTMLAttributes {}

  interface SplashScreenPage {}
  interface SplashScreenPageAttributes extends StencilHTMLAttributes {}

  interface SudokuWizardPage {}
  interface SudokuWizardPageAttributes extends StencilHTMLAttributes {}

  interface SudokuPage {}
  interface SudokuPageAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'AccButton': Components.AccButton;
    'AccFlipbox': Components.AccFlipbox;
    'AccSwitch': Components.AccSwitch;
    'AccTimer': Components.AccTimer;
    'KeyBoard3': Components.KeyBoard3;
    'SudokuBoardCellComponent': Components.SudokuBoardCellComponent;
    'SudokuBoardComponent': Components.SudokuBoardComponent;
    'AccPage': Components.AccPage;
    'AppRoot': Components.AppRoot;
    'CreateNewBoard': Components.CreateNewBoard;
    'SplashScreenPage': Components.SplashScreenPage;
    'SudokuWizardPage': Components.SudokuWizardPage;
    'SudokuPage': Components.SudokuPage;
  }

  interface StencilIntrinsicElements {
    'acc-button': Components.AccButtonAttributes;
    'acc-flipbox': Components.AccFlipboxAttributes;
    'acc-switch': Components.AccSwitchAttributes;
    'acc-timer': Components.AccTimerAttributes;
    'key-board3': Components.KeyBoard3Attributes;
    'sudoku-board-cell-component': Components.SudokuBoardCellComponentAttributes;
    'sudoku-board-component': Components.SudokuBoardComponentAttributes;
    'acc-page': Components.AccPageAttributes;
    'app-root': Components.AppRootAttributes;
    'create-new-board': Components.CreateNewBoardAttributes;
    'splash-screen-page': Components.SplashScreenPageAttributes;
    'sudoku-wizard-page': Components.SudokuWizardPageAttributes;
    'sudoku-page': Components.SudokuPageAttributes;
  }


  interface HTMLAccButtonElement extends Components.AccButton, HTMLStencilElement {}
  var HTMLAccButtonElement: {
    prototype: HTMLAccButtonElement;
    new (): HTMLAccButtonElement;
  };

  interface HTMLAccFlipboxElement extends Components.AccFlipbox, HTMLStencilElement {}
  var HTMLAccFlipboxElement: {
    prototype: HTMLAccFlipboxElement;
    new (): HTMLAccFlipboxElement;
  };

  interface HTMLAccSwitchElement extends Components.AccSwitch, HTMLStencilElement {}
  var HTMLAccSwitchElement: {
    prototype: HTMLAccSwitchElement;
    new (): HTMLAccSwitchElement;
  };

  interface HTMLAccTimerElement extends Components.AccTimer, HTMLStencilElement {}
  var HTMLAccTimerElement: {
    prototype: HTMLAccTimerElement;
    new (): HTMLAccTimerElement;
  };

  interface HTMLKeyBoard3Element extends Components.KeyBoard3, HTMLStencilElement {}
  var HTMLKeyBoard3Element: {
    prototype: HTMLKeyBoard3Element;
    new (): HTMLKeyBoard3Element;
  };

  interface HTMLSudokuBoardCellComponentElement extends Components.SudokuBoardCellComponent, HTMLStencilElement {}
  var HTMLSudokuBoardCellComponentElement: {
    prototype: HTMLSudokuBoardCellComponentElement;
    new (): HTMLSudokuBoardCellComponentElement;
  };

  interface HTMLSudokuBoardComponentElement extends Components.SudokuBoardComponent, HTMLStencilElement {}
  var HTMLSudokuBoardComponentElement: {
    prototype: HTMLSudokuBoardComponentElement;
    new (): HTMLSudokuBoardComponentElement;
  };

  interface HTMLAccPageElement extends Components.AccPage, HTMLStencilElement {}
  var HTMLAccPageElement: {
    prototype: HTMLAccPageElement;
    new (): HTMLAccPageElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLCreateNewBoardElement extends Components.CreateNewBoard, HTMLStencilElement {}
  var HTMLCreateNewBoardElement: {
    prototype: HTMLCreateNewBoardElement;
    new (): HTMLCreateNewBoardElement;
  };

  interface HTMLSplashScreenPageElement extends Components.SplashScreenPage, HTMLStencilElement {}
  var HTMLSplashScreenPageElement: {
    prototype: HTMLSplashScreenPageElement;
    new (): HTMLSplashScreenPageElement;
  };

  interface HTMLSudokuWizardPageElement extends Components.SudokuWizardPage, HTMLStencilElement {}
  var HTMLSudokuWizardPageElement: {
    prototype: HTMLSudokuWizardPageElement;
    new (): HTMLSudokuWizardPageElement;
  };

  interface HTMLSudokuPageElement extends Components.SudokuPage, HTMLStencilElement {}
  var HTMLSudokuPageElement: {
    prototype: HTMLSudokuPageElement;
    new (): HTMLSudokuPageElement;
  };

  interface HTMLElementTagNameMap {
    'acc-button': HTMLAccButtonElement
    'acc-flipbox': HTMLAccFlipboxElement
    'acc-switch': HTMLAccSwitchElement
    'acc-timer': HTMLAccTimerElement
    'key-board3': HTMLKeyBoard3Element
    'sudoku-board-cell-component': HTMLSudokuBoardCellComponentElement
    'sudoku-board-component': HTMLSudokuBoardComponentElement
    'acc-page': HTMLAccPageElement
    'app-root': HTMLAppRootElement
    'create-new-board': HTMLCreateNewBoardElement
    'splash-screen-page': HTMLSplashScreenPageElement
    'sudoku-wizard-page': HTMLSudokuWizardPageElement
    'sudoku-page': HTMLSudokuPageElement
  }

  interface ElementTagNameMap {
    'acc-button': HTMLAccButtonElement;
    'acc-flipbox': HTMLAccFlipboxElement;
    'acc-switch': HTMLAccSwitchElement;
    'acc-timer': HTMLAccTimerElement;
    'key-board3': HTMLKeyBoard3Element;
    'sudoku-board-cell-component': HTMLSudokuBoardCellComponentElement;
    'sudoku-board-component': HTMLSudokuBoardComponentElement;
    'acc-page': HTMLAccPageElement;
    'app-root': HTMLAppRootElement;
    'create-new-board': HTMLCreateNewBoardElement;
    'splash-screen-page': HTMLSplashScreenPageElement;
    'sudoku-wizard-page': HTMLSudokuWizardPageElement;
    'sudoku-page': HTMLSudokuPageElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
