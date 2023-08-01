import { initializeApp } from "firebase/app"
import { FIREBASE_CONFIG } from "../config/index"
import { getAuth } from "firebase/auth"


export const firebasApp = initializeApp(FIREBASE_CONFIG)
export const firebaseAuth = getAuth(firebasApp)