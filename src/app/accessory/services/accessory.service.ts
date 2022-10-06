import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentChangeAction,
} from "@angular/fire/compat/firestore";
import { ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { first, map, take, takeLast } from "rxjs/operators";
import { setAccessories } from "../accessory-actions";
import { Accessory } from "../models/accesory.model";

@Injectable()
export class AccessoryService {
  constructor(private db: AngularFirestore, private store: Store) {}

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

  deleteAccessory(accesory: Accessory) {
    this.db.collection("accessories").doc(accesory.id).delete();
  }
}
