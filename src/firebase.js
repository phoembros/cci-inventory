import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {  
    apiKey: "AIzaSyDMu3PvuJbKxlzVSSrurDRnhiuellwe6zY",
    authDomain: "cci-inventory-sm-new.firebaseapp.com",
    projectId: "cci-inventory-sm-new",
    storageBucket: "cci-inventory-sm-new.appspot.com",
    messagingSenderId: "342359600141",
    appId: "1:342359600141:web:f506592800dfaa9e4cb944",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
// Initialize Firebase Authentication and get a reference to the service
export default app;
