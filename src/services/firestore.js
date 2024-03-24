import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyApc0uqiP-qnHiwUvJVeTSHIzipwBfpHhI",
    authDomain: "receipt-management-syste-a0079.firebaseapp.com",
    projectId: "receipt-management-syste-a0079",
    storageBucket: "receipt-management-syste-a0079.appspot.com",
    messagingSenderId: "142352045070",
    appId: "1:142352045070:web:71c39ca87c02ca8543d85f"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
