import { Component, State, Element, h } from '@stencil/core';
import { store } from '../../store/appStore';
import { AppState } from '../../store/app.state';
import * as navigateToSudoku_ResumeTimer from '../../store/_combinedActions/actions.navigateToSudoku_ResumeTimer';
import * as showUniqueCandidateAction from "../../store/sudoku/sudoku.actions.wizard.showsUniqueCandidateToggle";
import * as showUniqueCandidateInZoneAction from "../../store/sudoku/sudoku.actions.wizard.showsUniqueCandidateInZoneToggle";
import * as autoCalculateCandidateAction from "../../store/sudoku/sudoku.actions.wizard.AutoCalculatePossibleValuesToggle";
import { SudokuWizardConfiguration, sudokuWizardConfigurationInit } from '../../services/sudoku/sudoku';

@Component({
  tag: 'sudoku-wizard',
  styleUrl: 'sudoku-wizard.css',
  shadow: false
})
export class SudokuWizardPage {

  @Element() element: HTMLSudokuWizardElement;
  @State() calculatePossibleValues: boolean;
  @State() showUniquePossibleValue: boolean;
  @State() showUniqueOccurenceInZones: boolean;
  @State() wizardConfiguration: SudokuWizardConfiguration = sudokuWizardConfigurationInit;


  unsubscribeStateChanged: () => void;

  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  componentDidLoad() {
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }

  stateChanged(state: AppState): any {
    this.calculatePossibleValues = state.sudokuPage.wizardConfiguration.calculatePossibleValues;
    this.showUniquePossibleValue = state.sudokuPage.wizardConfiguration.showUniquePossibleValueInRowOrColumn;
    this.showUniqueOccurenceInZones = state.sudokuPage.wizardConfiguration.showUniquePossiblrValueInZones;
  }

  onBackClickHandler() {
    store.dispatch(navigateToSudoku_ResumeTimer.action());
  }

  onShowUniqueCandidateClickHandler() {
    store.dispatch(showUniqueCandidateAction.action());
  }
  onShowUniqueCandidateInZoneClickHandler() {
    store.dispatch(showUniqueCandidateInZoneAction.action());
  }

  onCalculatePossibleValuesClickHandler() {
    store.dispatch(autoCalculateCandidateAction.action());
  }

  render() {
    return ([
      <acc-page name="sudoku-wizard">
        <acc-header backbutton
          onBackClick={() => this.onBackClickHandler()}>
          Need an help?
        </acc-header>

        <acc-switch
          onSwitch={() => this.onShowUniqueCandidateClickHandler()}
          checkInitialValue={this.showUniquePossibleValue}>
            Highlight unique candidate in row, column
        </acc-switch>

        <acc-switch
          onSwitch={() => this.onShowUniqueCandidateInZoneClickHandler()}
          checkInitialValue={this.showUniqueOccurenceInZones}>
            Highlight unique candidate in zone
        </acc-switch>
      </acc-page>
    ]);
  }
}