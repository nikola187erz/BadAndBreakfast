import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../_classes/user';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  getAllUser() {
    return this.db.list<User>("/users/").snapshotChanges().pipe(
      map(users => 
        users.map(user => (
          {
            ...user.payload.val() 
          }
        ))
      )
    );
  }

  create(uid: string, user: User) {
    return new Promise((res, rej) => {
      this.db.list("/users/").set(uid, user).then(
        () => res(true)
      ).catch((err) => {
        rej(err.message);
      })
    })
  }

  update(uid: string, user: User) {
    return new Promise((res, rej) => {
      this.db.list("/users/").set(uid, user).then(
        () => res(true)
      ).catch((err) => {
        rej(err);
      })
    })
  }

  getUserData(uid: string) {
    return this.db.object<User>("/users/" + uid).valueChanges();
  }
}
