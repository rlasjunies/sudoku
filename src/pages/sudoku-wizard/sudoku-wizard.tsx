import { Component, State, Element, h } from '@stencil/core';
import { store } from '../../store/appStore';
import { AppState } from '../../store/app.state';
import * as navigateToSudoku_ResumeTimer from '../../store/_combinedActions/actions.navigateToSudoku_ResumeTimer';
import * as showUniqueCandidateAction from "../../store/sudoku/sudoku.actions.wizard.showsUniqueCandidateToggle";
import * as showUniqueCandidateInZoneAction from "../../store/sudoku/sudoku.actions.wizard.showsUniqueCandidateInZoneToggle";
import * as autoCalculateCandidateAction from "../../store/sudoku/sudoku.actions.wizard.AutoCalculateCandidatesToggle";
import { SudokuWizardConfiguration, sudokuWizardConfigurationInit } from '../../services/sudoku/sudoku';

@Component({
  tag: 'sudoku-wizard',
  styleUrl: 'sudoku-wizard.css'
})
export class SudokuWizardPage {

  @Element() element: HTMLSudokuWizardElement;
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
    return ([
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            {/* <ion-back-button></ion-back-button> */}
            <ion-button onClick={() => this.onBackClickHandler()}>
              <ion-icon name="arrow-back"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>Need an help?</ion-title>
        </ion-toolbar>
      </ion-header>
      ,

      <ion-content>
        <ion-list>
          <ion-item
            onClick={() => this.onShowUniqueCandidateClickHandler()}>
            <ion-label>Highlight cells with unique candidate cells/rows/cols</ion-label>
            <ion-toggle slot="start"
              checked={this.showUniquePossibleValue}></ion-toggle>
          </ion-item>
          <ion-item
            onClick={() => this.onShowUniqueCandidateInZoneClickHandler()}>
            <ion-label>Highlight cells with unique candidates in row, column or zone</ion-label>
            <ion-toggle slot="start"
              checked={this.showUniqueOccurenceInZones}></ion-toggle>
          </ion-item>
        </ion-list>


        {/* <label class="choice">
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
          </label> */}

      </ion-content>
    ]
    );
  }
}