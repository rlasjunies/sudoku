import { Component, State, Element, h } from '@stencil/core';
import { store } from '../../store/appStore';
import { AppState } from '../../store/app.state';
import * as navigateToSudoku_ResumeTimer from '../../store/_combinedActions/actions.navigateToSudoku_ResumeTimer';
import * as showUniqueCandidateAction from "../../store/sudoku/sudoku.actions.wizard.showsUniqueCandidateToggle";
import * as showUniqueCandidateInZoneAction from "../../store/sudoku/sudoku.actions.wizard.showsUniqueCandidateInZoneToggle";
import * as autoCalculateCandidateAction from "../../store/sudoku/sudoku.actions.wizard.AutoCalculateCandidatesToggle";
import { SudokuWizardConfiguration, sudokuWizardConfigurationInit } from '../../services/sudoku/sudoku';

@Component({
  tag: 'sudoku-wizard-page',
  styleUrl: 'sudoku-wizard.css'
})
export class SudokuWizardPage {

  @Element() element: HTMLSudokuWizardPageElement;
  @State() calculateCandidates: boolean;
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
    this.calculateCandidates = state.sudokuPage.wizardConfiguration.calculateCandidates;
    this.showUniquePossibleValue = state.sudokuPage.wizardConfiguration.showUniqueCandidate;
    this.showUniqueOccurenceInZones = state.sudokuPage.wizardConfiguration.showUniqueCandidatesInZones;
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

  onCalculateCandidatesClickHandler() {
    store.dispatch(autoCalculateCandidateAction.action());
  }

  render() {
    return (
      <acc-page>
        <div class="header">
          <button class="btn btn-link"
            onClick={() => this.onBackClickHandler()}>
            <clr-icon shape="angle caret left" size="35"></clr-icon>
          </button>
          <div class="title">
            Wizard
          </div>
        </div>
        <div class="content">
          <div>
            Need an help?
          </div>
          {/* <label class="choice">
            <input type="checkbox"
              checked={this.calculateCandidates}
              onClick={() => this.onCalculateCandidatesClickHandler()}
            ></input>
            Autocalculate the candidates
          </label> */}
          <label class="choice">
            <input type="checkbox"
              checked={this.showUniquePossibleValue}
              onClick={() => this.onShowUniqueCandidateClickHandler()}
            ></input>
            Shows the unique candidates
          </label>
          <label class="choice">
            <input type="checkbox"
              checked={this.showUniqueOccurenceInZones}
              onClick={() => this.onShowUniqueCandidateInZoneClickHandler()}
            ></input>
            Shows the unique candidates in row, column or zone
          </label>
          {/* <div>
            <clr-icon shape="calculator" size="35" class={this.wizardConfiguration.calculateCandidates ? "is-solid" : ""}></clr-icon>
            <button class=""
              onClick={() => this.onCalculateCandidatesClickHandler()}>
              Calculate candidate
          </button> 
          </div> */}
              {/* <clr-icon shape="calculator" size="35" class={this.wizardConfiguration.calculateCandidates ? "is-solid" : ""}></clr-icon> */}
        </div>
      </acc-page >
    );
  }
}