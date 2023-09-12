import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

function StartFirebase() {
    const firebaseConfig = {
        apiKey: 'AIzaSyBQN-ROfNhshqf76wqNR7u7E7E1K8tEgPc',
        authDomain: 'attendance-system-cff1f.firebaseapp.com',
        databaseURL:
            'https://attendance-system-cff1f-default-rtdb.firebaseio.com',
        projectId: 'attendance-system-cff1f',
        storageBucket: 'attendance-system-cff1f.appspot.com',
        messagingSenderId: '601566954603',
        appId: '1:601566954603:web:c975b4346fee354ab55d2e',
    };

    const app = initializeApp(firebaseConfig);
    return getDatabase(app);
}
export default StartFirebase;
