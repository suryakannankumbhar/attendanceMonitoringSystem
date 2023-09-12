import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBQN-ROfNhshqf76wqNR7u7E7E1K8tEgPc',
    authDomain: 'attendance-system-cff1f.firebaseapp.com',
    databaseURL: 'https://attendance-system-cff1f-default-rtdb.firebaseio.com',
    projectId: 'attendance-system-cff1f',
    storageBucket: 'attendance-system-cff1f.appspot.com',
    messagingSenderId: '601566954603',
    appId: '1:601566954603:web:7b33e6f345eb1905b55d2e',
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };
