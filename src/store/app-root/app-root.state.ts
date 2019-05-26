
export interface AppRootState {
  showSudokuPage: boolean;
  showSplashScreenPage:boolean;
  showCreateNewBoardPage: boolean;
  showSudokuWizardPage: boolean;
  gameOnGoing:boolean;

}
  
export const appRootInitialState: AppRootState = {
  showSplashScreenPage:true,
  showSudokuPage:false,
  showCreateNewBoardPage:false,
  showSudokuWizardPage:false,
  gameOnGoing:false

};
