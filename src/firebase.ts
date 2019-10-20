import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

export const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyB_cvt7EHu4Gz-9M5PdUkS08CEH1gzngxk",
	authDomain: "sudoku-accurentis.firebaseapp.com",
	databaseURL: "https://sudoku-accurentis.firebaseio.com",
	projectId: "sudoku-accurentis",
	storageBucket: "sudoku-accurentis.appspot.com",
	messagingSenderId: "746636744635"
  });

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const functions = firebaseApp.functions('europe-west1');
