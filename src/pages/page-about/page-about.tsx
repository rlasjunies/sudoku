import { Component, h } from '@stencil/core';
import { store } from "../../store/appStore";
// import * as navigateToHome from "../../store/app-root/app-root.actions.navigateToHome";
import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
@Component({
    tag: 'page-about',
    styleUrl: 'page-about.css'
})
export class PageAbout {
    onBackClickHandler() {
        // store.dispatch(navigateToHome.action());
        store.dispatch(navigateTo.action(navigateTo.pages.home));
    }
    render() {
        return ([
            // <acc-page name="about">
                <app-header-back title="about" onBackClick={() => this.onBackClickHandler()}></app-header-back>,
                <ion-content>
                        Sudoku Master
                </ion-content>
            // </acc-page>
        ]);
    }
}
