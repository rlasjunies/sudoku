
export interface AppRootState {
  showSudokuPage: boolean;
  showSplashScreenPage:boolean;
  showCreateNewBoardPage: boolean;
  gameOnGoing:boolean;

}
  
export const appRootInitialState: AppRootState = {
  showSplashScreenPage:true,
  showSudokuPage:false,
  showCreateNewBoardPage:false,
  gameOnGoing:false

};
