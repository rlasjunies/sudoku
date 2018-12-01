import { Component, State, Element, Watch } from '@stencil/core';
import { store } from '../../state/appStore';
import { AppState } from 'state/app.state';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @Element() element: HTMLAppRootElement;

  unsubscribeStateChanged: () => void;
  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  componentDidLoad() {
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }
  stateChanged(state: AppState, thisContext: AppRoot): any {
    thisContext.showSplashScreenPage = state.appRoot.showSplashScreenPage;
    thisContext.showSudokuPage = state.appRoot.showSudokuPage;
    thisContext.showCreateNewBoardPage = state.appRoot.showCreateNewBoardPage;
  }

  @State() showSplashScreenPage: boolean;
  @Watch("showSplashScreenPage")
  showSplashScreenWatcher(newValue: boolean, oldValue: boolean) {
    // console.log(`showSplashScreenWatcher: ${newValue} - ${oldValue}`)
    const splash = this.element.shadowRoot.querySelector('splash-screen-page');
    if (newValue && !oldValue) {
      // console.log("Show the splash screen!!!!");
      splash.show();
    } else if (!newValue && oldValue) {
      // console.log("Hiding the splash screen!!!!");
      splash.hide();
    }
  }

  @State() showSudokuPage: boolean;
  @Watch('showSudokuPage')
  showSudokuPagewatcher(newValue, oldValue) {
    // console.log(`showSudokuPagewatcher: ${newValue} - ${oldValue}`)
    const sudoku: HTMLAccPageElement = this.element.shadowRoot.querySelector('sudoku-page > acc-page');
    if (newValue && !oldValue) {
      // console.log("Show the sudoku page!!!!");
      sudoku.show();
    } else if (!newValue && oldValue) {
      // console.log("Hiding the sudoku page!!!!");
      sudoku.hide();
    }
  }

  @State() showCreateNewBoardPage: boolean;
  @Watch('showCreateNewBoardPage')
  showCreateNewBoardPagewatcher(newValue, oldValue) {
    // console.log(`showCreateNewBoardPagewatcher: ${newValue} - ${oldValue}`)
    const $createNewBoard: HTMLAccPageElement = this.element.shadowRoot.querySelector('create-new-board > acc-page');
    if (newValue && !oldValue) {
      // console.log("Show the create board page!!!!");
      $createNewBoard.show();
    } else if (!newValue && oldValue) {
      // console.log("Hiding the create board page!!!!");
      $createNewBoard.hide();
    }
  }
  render() {
    return [
      <splash-screen-page></splash-screen-page>,
      <sudoku-page></sudoku-page>,
      <create-new-board></create-new-board>
    ]
  }
}