const APPSTORE_DEV_MODE = ['%c[appStore]', 'color:#ff11ff;font-weight: bold'];
import { testEnvironment } from "../global/global";
import { Store } from "../services/store/store";
import { AppState } from "../store/app.state";

import { sudokuPageInitialState } from "./sudoku/sudoku.state";
import { splashScreenPageInitialState } from "./splash-screen/splash-screen.state";
import { appRootInitialState } from "./app-root/app-root.state";

import * as navigateTo from "./app-root/app-root.actions.navigateTo";
import * as endGameStopTime from "./_combinedActions/actions.endGame_StopTimer";
import * as generateBoard_NavigateToSudokuPage_StartTimer from "./_combinedActions/actions.generateBoard_NavigateToSudokuPage_StartTimer";
import * as navigateToSplashScreen_StopTimer from "./_combinedActions/actions.navigateToSplashScreen_StopTimer";
import * as navigateToSudoku_ResumeTimer from "./_combinedActions/actions.navigateToSudoku_ResumeTimer";
import * as navigateToWiazrd_PauseTimer from "./_combinedActions/actions.navigateToWiazrd_PauseTimer";
import * as pauseGame_PauseTimer from "./_combinedActions/actions.pauseGame_PauseTimer";
import * as resumeGame_ResumeTimer from "./_combinedActions/actions.resumeGame_ResumeTimer";

import * as clearCellValue from "./sudoku/sudoku.actions.clearCellValue";
import * as endGame from "./sudoku/sudoku.actions.endGame";
import * as pauseGame from "./sudoku/sudoku.actions.pauseGame";
import * as generateBoard from "./sudoku/sudoku.actions.generateBoard";
import * as resumeGame from "./sudoku/sudoku.actions.resumeGame";
import * as selectCell from "./sudoku/sudoku.actions.selectCell";
import * as timerPause from "./sudoku/sudoku.actions.timer.Pause";
import * as timerResume from "./sudoku/sudoku.actions.timer.Resume";
import * as timerStart from "./sudoku/sudoku.actions.timer.Start";
import * as typeDraftNumber from "./sudoku/sudoku.actions.typeDraftNumber";
import * as typeNumber from "./sudoku/sudoku.actions.typeNumber";
import * as undoLastMove from "./sudoku/sudoku.actions.undoLastMove";
import * as wizardAutoCalculatePossibleValuesToggle from "./sudoku/sudoku.actions.wizard.AutoCalculatePossibleValuesToggle";
import * as wizardshowsUniqueCandidateInZoneToggle from "./sudoku/sudoku.actions.wizard.showsUniqueCandidateInZoneToggle";
import * as wizardshowsUniqueCandidateToggle from "./sudoku/sudoku.actions.wizard.showsUniqueCandidateToggle";
import * as wizardshowsErrornousCellsToggle from "./sudoku/sudoku.actions.wizard.showErrornousCellsToggle";
import * as wizardshowsshowIdenticalNumber from "./sudoku/sudoku.actions.wizard.showIdenticalNumbers";

// import "sudoku-wasm";
// let imports={};
// wasm2({ ...imports }).then(({ instance }) => {
//   console.log(instance.exports.main());
// });
// wasm2.hello();

// run();
// hello();

// import { hello } from "./assets/sudoku-wasm";
// setTimeout(() => {
//   hello();
// }, 3000);


const initialState: AppState = {
  sudokuPage: sudokuPageInitialState,
  splashScreenPage: splashScreenPageInitialState,
  appRoot: appRootInitialState
}

testEnvironment && console.debug(...APPSTORE_DEV_MODE, `parsing of the store:${new Date()}`);
export const store = new Store(initialState, 'sudoku-accurentis');

store.registerReducer(navigateTo.NAME, navigateTo.reducer);
store.registerReducer(endGameStopTime.action().name, endGameStopTime.reducer)
store.registerReducer(generateBoard_NavigateToSudokuPage_StartTimer.NAME, generateBoard_NavigateToSudokuPage_StartTimer.reducer);
store.registerReducer(navigateToSplashScreen_StopTimer.action().name, navigateToSplashScreen_StopTimer.reducer);
store.registerReducer(navigateToSudoku_ResumeTimer.action().name, navigateToSudoku_ResumeTimer.reducer);
store.registerReducer(navigateToWiazrd_PauseTimer.action().name, navigateToWiazrd_PauseTimer.reducer);
store.registerReducer(pauseGame_PauseTimer.action().name, pauseGame_PauseTimer.reducer);
store.registerReducer(resumeGame_ResumeTimer.action().name, resumeGame_ResumeTimer.reducer)

store.registerReducer(clearCellValue.action().name, clearCellValue.reducer);;
store.registerReducer(endGame.action().name, endGame.reducer);
store.registerReducer(generateBoard.NAME, generateBoard.reducer);
store.registerReducer(pauseGame.action().name, pauseGame.reducer);
store.registerReducer(resumeGame.action().name, resumeGame.reducer);
store.registerReducer(selectCell.NAME, selectCell.reducer);
store.registerReducer(timerPause.action().name, timerPause.reducer);
store.registerReducer(timerResume.action().name, timerResume.reducer);
store.registerReducer(timerStart.action().name, timerStart.reducer);
store.registerReducer(typeDraftNumber.NAME, typeDraftNumber.reducer);
store.registerReducer(typeNumber.NAME, typeNumber.reducer);
store.registerReducer(undoLastMove.action().name, undoLastMove.reducer);
store.registerReducer(wizardAutoCalculatePossibleValuesToggle.action().name, wizardAutoCalculatePossibleValuesToggle.reducer);
store.registerReducer(wizardshowsUniqueCandidateInZoneToggle.action().name, wizardshowsUniqueCandidateInZoneToggle.reducer);
store.registerReducer(wizardshowsUniqueCandidateToggle.action().name, wizardshowsUniqueCandidateToggle.reducer);
store.registerReducer(wizardshowsErrornousCellsToggle.action().name, wizardshowsErrornousCellsToggle.reducer);
store.registerReducer(wizardshowsshowIdenticalNumber.action().name, wizardshowsshowIdenticalNumber.reducer);


/**
 * sort of "middleware"
 */



// log in the web console the actions
import * as logger from "../store/middleware/logger";
if (testEnvironment) logger.register(store);

// activate, deactivate, state update by the timer
import * as timer from "../store/middleware/timerService";
import * as timerTick from "./sudoku/sudoku.actions.timer.Tick";
store.registerReducer(timerTick.action().name, timerTick.reducer);
timer.register(store);

// import init, { hello } from 'sudoku-wasm';

// async function run() {
//   // First up we need to actually load the wasm file, so we use the
//   // default export to inform it where the wasm file is located on the
//   // server, and then we wait on the returned promise to wait for the
//   // wasm to be loaded.
//   // It may look like this: `await init('./pkg/without_a_bundler_bg.wasm');`,
//   // but there is also a handy default inside `init` function, which uses
//   // `import.meta` to locate the wasm file relatively to js file
//   //
//   // Note that instead of a string here you can also pass in an instance
//   // of `WebAssembly.Module` which allows you to compile your own module.
//   // Also note that the promise, when resolved, yields the wasm module's
//   // exports which is the same as importing the `*_bg` module in other
//   // modes
//   console.log("Avant init2")
//   await init();
//   console.log("Apres init2")
//   hello();
//   console.log("*********** wasm loaded2!!! ");
// }
// run();

// import { hello } from "sudoku_wasm";
// setTimeout(() => {
//   hello();
// }, 5000);


// import { computeCellsToHide } from "../services/sudoku/sudoku";
// // console.assert(false);
// // debugger;
// for (let index = 0; index < 100; index++) {
//   computeCellsToHide(50);
// }