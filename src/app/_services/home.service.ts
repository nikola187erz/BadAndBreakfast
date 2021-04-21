import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private db: AngularFireDatabase) {

  }

  create(home: any) {
    return new Promise((res, rej) => {
      this.db.list<any>("/homes/").push(home).then( () => {
        res(true);
      }).catch( (err) => {
        rej(err.message);
      })
    })
  }

  get(): Observable<any[]> {
    return this.db.list<any>("/homes/").snapshotChanges().pipe(
      map(homes => 
        homes.map(home => (
          { key: home.payload.key, 
            ...home.payload.val() 
          }
        ))
      )
    );
}

  getById(key: string): Observable<any> { 
    return this.db.object<any>("/homes/" + key).snapshotChanges().pipe(
      map(home => (
        { key: home.payload.key, 
          ...home.payload.val() 
        }
      ))
    );
  }

  update(key: string, home: any) {
    return new Promise((res, rej) => {
      this.db.list<any>("/homes/").update(key, home).then(() => {
        res(true);
      }).catch((err) => {
        rej(err.message);
      })
    })
  }

  delete(key: string) {
    return new Promise((res, rej) => {
      this.db.list<any>("/homes/").remove(key).then(() => {
        res(true);
      }).catch( (err) => {
        rej(err.message);
      })
    })
  }
}
