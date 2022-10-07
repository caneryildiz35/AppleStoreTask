import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, Observable, of } from "rxjs";
import { Offer } from "../models/offer.model";

@Injectable()
export class OfferService {
  constructor(private db: AngularFirestore) {}

  getOffers(): Observable<Offer[]> {
    return this.db
      .collection("offers")
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            let data = doc.payload.doc.data() as Offer;
            return {
              id: doc.payload.doc.id,
              ...data,
            };
          });
        })
      );
  }

  addOffer(offer: Offer): Observable<any> {
    return of(this.db.collection("offers").add(offer));
  }

  updateOffer(offer: Offer): Observable<any> {
    let doc: any;
    return of(
      (doc = this.db.collection("offers", (ref) =>
        ref.where("id", "==", offer.id)
      )),
      this.db
        .collection("offers")
        .doc(offer.id)
        .set({ ...offer })
    );
  }

  deleteOffer(offer: Offer) {
    this.db.collection("offers").doc(offer.id).delete();
  }
}
