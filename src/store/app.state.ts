import { SudokuPageState } from "./sudoku/sudoku.state";
import { SplashScreenPageState } from "./splash-screen/splash-screen.state";
import { AppRootState } from "./app-root/app-root.state";
export interface AppState {
  sudokuPage: SudokuPageState;
  splashScreenPage: SplashScreenPageState;
  appRoot: AppRootState
}
