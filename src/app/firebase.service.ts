import { Injectable } from '@angular/core';
import { firebaseConfig } from './firebase-config'; // Adjust the path as per your project structure
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(firebaseConfig);
  public db = getFirestore(this.app);
  public analytics = getAnalytics(this.app);

  constructor() { }
}
