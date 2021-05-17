/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDFhWiXHeL1PbKD2jyoDIJ8ihXRHjplp-M',
  authDomain: 'the-og-gram.firebaseapp.com',
  projectId: 'the-og-gram',
  storageBucket: 'the-og-gram.appspot.com',
  messagingSenderId: '806931542603',
  appId: '1:806931542603:web:e7170a96875b4ead5593ce'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// console.log('firebase', firebase);

export { firebase, FieldValue };
