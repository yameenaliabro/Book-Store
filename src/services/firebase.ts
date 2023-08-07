import { initializeApp } from "firebase/app"
import { FIREBASE_CONFIG } from "../config/index"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"


export const firebasApp = initializeApp(FIREBASE_CONFIG)
export const firebaseStorage = getStorage(firebasApp)
export const firebaseAuth = getAuth(firebasApp)