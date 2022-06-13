import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDHVaqgYnynMxKykY8AQngz_NvawXcCfGI",
    authDomain: "inventory-ms-fb153.firebaseapp.com",
    projectId: "inventory-ms-fb153",
    storageBucket: "inventory-ms-fb153.appspot.com",
    messagingSenderId: "221654689699",
    appId: "1:221654689699:web:4fc7c39721b3445418dc16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
// Initialize Firebase Authentication and get a reference to the service
export default app;
