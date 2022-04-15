import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
//==========================================================================================================

import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyBvowixoXYQyMsJU-Ra4qk4bVNsfollwos',
  authDomain: 'realtime-chat-a07fc.firebaseapp.com',
  projectId: 'realtime-chat-a07fc',
  storageBucket: 'realtime-chat-a07fc.appspot.com',
  messagingSenderId: '541598993127',
  appId: '1:541598993127:web:514a9dab6fa8d4fe897042',
  measurementId: 'G-5J4ZRCJZQ2',
});

export const Context = React.createContext(null);

const provider = new GoogleAuthProvider();
const auth = getAuth();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{ provider, auth }}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
