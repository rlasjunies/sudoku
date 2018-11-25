
export interface AppRootState {
  showSudokuPage: boolean;
  showSplashScreenPage:boolean;
  gameOnGoing:boolean;

}
  
export const appRootInitialState: AppRootState = {
  showSplashScreenPage:true,
  showSudokuPage:false,
  gameOnGoing:false
};
