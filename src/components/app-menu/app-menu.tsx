import { Component, h } from '@stencil/core';
import { Action } from '../../services/store/store';
import { store } from "../../store/appStore";

import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
enum actionList {
    authentication = "auth",
    home = "home",
    new = "new",
    about = "about"
}

@Component({
    tag: 'app-menu',
    styleUrl: 'app-menu.css'
})
export class AppMenu {

    menuClick(url: string) {
        let action: Action = null;
        switch (url) {
            case actionList.authentication:
                action = navigateTo.action(navigateTo.pages.authentication);
                break;

            case actionList.home:
                action = navigateTo.action(navigateTo.pages.home);
                break;

            case actionList.new:
                action = navigateTo.action(navigateTo.pages.newGame);
                break;

            case actionList.about:
                action = navigateTo.action(navigateTo.pages.about);
                break;
            default:
                console.log("no action found in the menu");
                break;
        }
        if (action !== null) {
            store.dispatch(action);
        }
    }
    render() {
        return (
            <ion-menu-toggle>
                <ion-menu side="start" contentId="main" >
                    {/* <ion-header>
                    <ion-toolbar color="primary">
                        <ion-title>Start Menu</ion-title>
                    </ion-toolbar>
                </ion-header> */}
                    <ion-content>
                        <ion-list>
                            <ion-item onClick={() => this.menuClick(actionList.authentication)}>
                                <ion-icon name="person" slot="start"></ion-icon>
                                <ion-label>login</ion-label>
                            </ion-item>
                            <ion-item onClick={() => this.menuClick(actionList.home)}>
                                <ion-icon name="home" slot="start"></ion-icon>
                                <ion-label>home</ion-label>
                            </ion-item>
                            <ion-item onClick={() => this.menuClick(actionList.new)}>
                                <ion-icon name="add" slot="start"></ion-icon>
                                <ion-label>new game</ion-label>
                            </ion-item>
                            <ion-item onClick={() => this.menuClick(actionList.about)}>
                                <ion-icon name="information-circle-outline" slot="start"></ion-icon>
                                <ion-label>about</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-content>
                </ion-menu>
            </ion-menu-toggle>
        );
    }
}
