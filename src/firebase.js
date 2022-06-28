import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    
    // apiKey: "AIzaSyDHVaqgYnynMxKykY8AQngz_NvawXcCfGI",
    // authDomain: "inventory-ms-fb153.firebaseapp.com",
    // projectId: "inventory-ms-fb153",
    // storageBucket: "inventory-ms-fb153.appspot.com",
    // messagingSenderId: "221654689699",
    // appId: "1:221654689699:web:4fc7c39721b3445418dc16"

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
