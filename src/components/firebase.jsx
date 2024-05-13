import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDh6oXtKI2ZCxxai9Lgfn0Lt0a1T6EEuho",
    authDomain: "librarian-dcc87.firebaseapp.com",
    databaseURL: "https://librarian-dcc87-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "librarian-dcc87",
    storageBucket: "librarian-dcc87.appspot.com",
    messagingSenderId: "678804120090",
    appId: "1:678804120090:web:bbdaca27b9e236a4b227a3",
    measurementId: "G-HPETRP6M98"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default auth;