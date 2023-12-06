import env from './utils/validateEnv';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-hello.firebaseapp.com',
  projectId: 'mern-hello',
  storageBucket: 'mern-hello.appspot.com',
  messagingSenderId: '1050241686964',
  appId: '1:1050241686964:web:d4d11b5754424f0415a6e1',
  measurementId: 'G-EEQKXQB9WR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
