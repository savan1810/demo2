import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAnTpF8eAZ1EwGCvHdFYr0ORJMiMRU1A-A",
  authDomain: "fir-7cf5a.firebaseapp.com",
  projectId: "fir-7cf5a",
  storageBucket: "fir-7cf5a.appspot.com",
  messagingSenderId: "644262370808",
  appId: "1:644262370808:web:854dd7adee0029ad9dca0d"
};

const app = initializeApp(firebaseConfig) 
export const auth = getAuth(app)


