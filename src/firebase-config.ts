import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhrZaa8KfHMfArB9XyaQ1gTP0k_U6xUSo",
  authDomain: "sokopap-dfd1c.firebaseapp.com",
  projectId: "sokopap-dfd1c",
  storageBucket: "sokopap-dfd1c.appspot.com",
  messagingSenderId: "454931359498",
  appId: "1:454931359498:web:41b6270d02c1f4cacb7cf3",
  measurementId: "G-6MG97NENN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
