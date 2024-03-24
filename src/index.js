import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app'; 
import FireBaseConfig from './services/firebaseConfig'

const firebaseConfig =FireBaseConfig


initializeApp(firebaseConfig); 

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found in the DOM.");
} else {
  ReactDOM.render(
  
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
}
