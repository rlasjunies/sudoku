# how to use?

## create the store


## create as many actions / reducer as needed

> more granular are the actions better will be the solution


## register the store at the root of the application

``` javascript
import { store } from 'state/appStore';

class rootComponent{

  unsubscribeStateChanged: () => void;

  componentDidLoad() {
    this.unsubscribeStateChanged = store.subscribeReaction(this.stateChanged, this);
  }
  
  componentDidUnload() {
    this.unsubscribeStateChanged();
  }

  stateChanged(state: AppState): any {
    this.showSplashScreenPage = state.appRoot.showSplashScreenPage;
    this.showSudokuPage = state.appRoot.showSudokuPage;
    this.showCreateNewBoardPage = state.appRoot.showCreateNewBoardPage;
  }
  ...
}
```

## events

> events are not managed directly in the store but the root of the component

## combine actions

> combine actions to create more complex actions
