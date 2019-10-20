import { Component, h, State } from '@stencil/core';
import { store } from "../../store/appStore";
// import * as navigateToHome from "../../store/app-root/app-root.actions.navigateToHome";
import * as navigateTo from "../../store/app-root/app-root.actions.navigateTo";
import { authSvc } from "../../services/AuthService";

@Component({
    tag: 'page-auth',
    styleUrl: 'page-auth.css'
})
export class PageAuth {
    @State() email:string;

    onBackClickHandler() {
        store.dispatch(navigateTo.action(navigateTo.pages.home));
    }

    onGoogleAuthenticateHandler() {
        authSvc.google();
    }

    async onEmailAuthenticateClickHandler() {
        await this.sendLink();
    }

    onEmailInputHandler(inputEvent) {
        // console.log((email.srcElement as any).value);
        this.email = inputEvent.target.value;
    }

    async sendLink() {
		try {
			if (this.email) {
				// await authSvc.sendEmailLink(this.email.trim());
				//return this.dismissModal();
			} 
		} catch (error) {
			console.log("error sending email authentication",error.code, error.message);
		}
	}

    render() {
        return ([
            <app-header-back title="authentication" onBackClick={() => this.onBackClickHandler()}></app-header-back>,
            <ion-content>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            {/* 
                            <ion-item>
                                <ion-label position="floating">Enter your email address</ion-label>
                                <ion-input required type="email" onInput={(evt: UIEvent) => this.onEmailInputHandler(evt)} />
                            </ion-item>
                            <ion-button class="loginwith" onClick={() => this.onEmailAuthenticateClickHandler()}>
                                <ion-icon name="mail"></ion-icon>Instant login via email
                            </ion-button> 
                            */}
                            <ion-button class="loginwith" onClick={() => this.onGoogleAuthenticateHandler()}>
                                <ion-icon name="logo-google"></ion-icon>Login with Google account
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>
        ]);
    }
}

