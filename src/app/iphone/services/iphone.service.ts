import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { from, map, Observable, of } from "rxjs";
import { Iphone } from "../models/iphone.model";

@Injectable()
export class IphoneService {
  constructor(private db: AngularFirestore) {}

  getIphones(): Observable<Iphone[]> {
    return this.db
      .collection("iphones")
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            let data = doc.payload.doc.data() as Iphone;
            return {
              id: doc.payload.doc.id,
              ...data,
            };
          });
        })
      );
  }

  addIphone(iphone: Iphone): Observable<any> {
    return from(this.db.collection("iphones").add(iphone));
  }

  updateIphone(iphone: Iphone): Observable<any> {
    let doc: any;
    return of(
      (doc = this.db.collection("iphones", (ref) =>
        ref.where("id", "==", iphone.id)
      )),
      this.db
        .collection("iphones")
        .doc(iphone.id)
        .set({ ...iphone })
    );
  }

  deleteIphone(iphone: Iphone): void {
    this.db.collection("iphones").doc(iphone.id).delete();
  }
}
