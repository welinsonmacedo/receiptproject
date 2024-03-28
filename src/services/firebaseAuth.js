import { initializeApp } from 'firebase/app'; 
import { getAuth } from 'firebase/auth'; // Importe diretamente do pacote de autenticação do Firebase
import firebaseConfig from '../services/firebaseConfig'; 

// Inicialize o app do Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtenha a instância de autenticação do Firebase
export const auth = getAuth(firebaseApp);
