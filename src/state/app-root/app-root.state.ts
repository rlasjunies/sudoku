
export interface AppRootState {
  showSudokuPage: boolean;
  showSplashScreenPage:boolean;
}
  
export const appRootInitialState: AppRootState = {
  showSplashScreenPage:true,
  showSudokuPage:false
};
