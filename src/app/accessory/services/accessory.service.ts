import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Accessory } from "../models/accesory.model";

@Injectable()
export class AccessoryService {
  constructor(private db: AngularFirestore) {}

  getAccessories(): Observable<Accessory[]> {
    return this.db
      .collection("accessories")
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            let data = doc.payload.doc.data() as Accessory;
            return {
              id: doc.payload.doc.id,
              ...data,
            };
          });
        })
      );
  }

  addAccessory(accessory: Accessory) {
    return this.db
      .collection("accessories")
      .add(accessory)
      .catch((error) => alert(error));
  }

  updateAccessory(accessory: Accessory): Observable<any> {
    let doc: any;

    return of(
      (doc = this.db.collection("accessories", (ref) =>
        ref.where("id", "==", accessory.id)
      )),
      this.db
        .collection("accessories")
        .doc(accessory.id)
        .set({ ...accessory })
    );
  }

  deleteAccessory(accesory: Accessory) : void {
    this.db.collection("accessories").doc(accesory.id).delete();
  }
}
