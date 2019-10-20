import firebase from 'firebase/app'
import { auth } from "../firebase";

export class AuthService {

	public google() {
		const provider = new firebase.auth.GoogleAuthProvider();
		return this.providerHandler(provider);
	}

	// public sendEmailLink(email: string) {
	// 	console.log("$$$$$$$$$$$", location);
	// 	const actionCodeSettings = {
	// 		url: 'http://localhost:3333/',
	// 		handleCodeInApp: true
	// 	};
	// 	localStorage.setItem('emailForSignIn', email);
	// 	return auth.sendSignInLinkToEmail(email, actionCodeSettings);
	// }

	// public async verifyEmailLink(url: string) {
	// 	if (auth.isSignInWithEmailLink(url)) {
	// 		let email = localStorage.getItem('emailForSignIn');
	// 		if (!email) {
	// 			// email = await this.openPrompt();
	// 			email = "";
	// 		}
	// 		const result = await auth.signInWithEmailLink(email, url);

	// 		if (result.additionalUserInfo.isNewUser) {
	// 			// do something for new users
	// 		}

	// 		if (history && history.replaceState) {
	// 			history.replaceState({}, document.title, url.split('?')[0]);
	// 		}

	// 		localStorage.removeItem('emailForSignIn');
	// 	}
	// }


	private providerHandler(provider: any) {
		return auth.signInWithPopup(provider);
	}

	// private async openPrompt() {
	// const prompt = await Modals.prompt({
	// 	title: 'Email Verification',
	// 	message: 'Please provider your email for confirmation',
	// 	inputPlaceholder: 'Email address'
	// });
	// return prompt.value;
	// }

}

export const authSvc = new AuthService();