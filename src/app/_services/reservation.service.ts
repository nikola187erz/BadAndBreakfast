import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private db: AngularFireDatabase) {}
  
  getFromUser(uid: string): Observable<any[]> {
    return this.db.list<any>("/reservations/", ref => {return ref.orderByChild('uid').equalTo(uid)}).snapshotChanges().pipe(
      map(reservations => 
        reservations.map(reservation => (
          { key: reservation.payload.key, 
            ...reservation.payload.val() 
          }
        ))
      )
    );
  }

  getFromHome(homeid: string): Observable<any[]> {
    return this.db.list<any>("/reservations/", ref => {return ref.orderByChild('homeid').equalTo(homeid)}).snapshotChanges().pipe(
      map(reservations => 
        reservations.map(reservation => (
          { key: reservation.payload.key, 
            ...reservation.payload.val() 
          }
        ))
      )
    );
  }

  create(reservation: any) {
    return new Promise((res, rej) => {
      this.db.list<any>("/reservations/").push(reservation).then( () => {
        res(true);
      }).catch( (err) => {
        rej(err.message);
      })
    })
  }

  read(key: string): Observable<any> { 
    return this.db.object<any>("/reservations/" + key).snapshotChanges().pipe(
      map(reservation => (
        { key: reservation.payload.key, 
          ...reservation.payload.val() 
        }
      ))
    );
  }

  update(key: string, reservation: any) {
    return new Promise((res, rej) => {
      this.db.list<any>("/reservations/").update(key, reservation).then(() => {
        res(true);
      }).catch((err) => {
        rej(err.message);
      })
    })
  }

  delete(key: string) {
    return new Promise((res, rej) => {
      this.db.list<any>("/reservations/").remove(key).then(() => {
        res(true);
      }).catch( (err) => {
        rej(err.message);
      })
    })
  }
}
