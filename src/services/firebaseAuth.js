import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app'; 
import firebaseConfig from '../services/firebaseConfig'; 


const firebaseApp = initializeApp(firebaseConfig);


export const auth = getAuth(firebaseApp);
