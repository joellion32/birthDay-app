import firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCG2YSvDqwrSuXucrpzRZSEBwciLM7N6qE",
    authDomain: "birthday-app-5a40e.firebaseapp.com",
    databaseURL: "https://birthday-app-5a40e.firebaseio.com",
    projectId: "birthday-app-5a40e",
    storageBucket: "birthday-app-5a40e.appspot.com",
    messagingSenderId: "364207309291",
    appId: "1:364207309291:web:6895f2ab142d60f1eb59ae"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);