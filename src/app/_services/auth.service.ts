import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public afAuth: AngularFireAuth, private router: Router) {

  }

  getCurrentUser(): Promise<any> {
    return this.afAuth.currentUser;
  }

  signIn(credentials: any) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((res) => {
          resolve(true);
        }).catch((err) => {
          reject(err.message);
        })
    });
  }

  signUp(credentials: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(res => {
          if (res.user) {
            res.user.sendEmailVerification();
            resolve(res.user.uid);
          }
        }).catch((err) => {
          reject(err.message)
        })
    })
  }

  resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(email)
        .then(() => {
          resolve(true)
        })
        .catch((err) => {reject(err.message)})
    })
  }

  signOut() {
    return new Promise((resolve, reject) => {
      this.afAuth.signOut()
      .then(() => {
        this.router.navigate(["sign-in"]);
        resolve(true)
      })
      .catch((err) => {reject(err.message)})
    })

  }
}