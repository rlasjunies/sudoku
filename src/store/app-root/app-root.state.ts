
export interface AppRootState {
  showSudokuPage: boolean;
  showSplashScreenPage:boolean;
  showCreateNewBoardPage: boolean;
  showSudokuWizardPage: boolean;
  gameOnGoing:boolean;
  url:string;

}
  
export const appRootInitialState: AppRootState = {
  showSplashScreenPage:true,
  showSudokuPage:false,
  showCreateNewBoardPage:false,
  showSudokuWizardPage:false,
  gameOnGoing:false,
  url:"sudoku-home"
};
