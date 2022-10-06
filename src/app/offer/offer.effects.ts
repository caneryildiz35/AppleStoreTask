import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { AccessoryActions } from "../accessory/accessory-action-types";
import { getAllAccessories } from "../accessory/accessory.selectors";
import { OfferActions } from "./offer-action-types";
import { getAllOffers } from "./offer.selectors";
import { OfferService } from "./services/offer.services";


@Injectable()
export class OfferEffects {

    constructor(private actions: Actions,
        private router: Router,
        private db: AngularFirestore,
        private offerService: OfferService,
        private store: Store) {

    }



    getOffers = createEffect(() =>
        this.actions.pipe(
            ofType(OfferActions.getOffers),
            withLatestFrom(this.store.select(getAllOffers)),
            switchMap(([action, offers]) => {
               /* if (offers.length) {
                    return of()
                    bu kontrol kaldıgında sayfa yenilenmiyor cunku offersın lenghti initialState dısında her zaman true
                    true oldugu ıcın ıf e gırıyor ve  store set edılmıyor 
                 }*/    
                return this.offerService.getOffers().pipe(
                    map(offers => OfferActions.setOffers({ offers }))
                )
            })
        )
    )


    startAddOffer = createEffect(() =>
        this.actions.pipe(
            ofType(OfferActions.startAddOffer),
        
            switchMap(action =>
                this.offerService.addOffer(action.offer).pipe(
                    map(offer => OfferActions.addOffer({ offer }))
                )
            )
        )
    )

    deleteOffer = createEffect(() =>
        this.actions.pipe(
            ofType(OfferActions.deleteOffer),
            tap(action => {
                this.offerService.deleteOffer(action.offer);
            })
        ),
        { dispatch: false }
    )

    updateOffer = createEffect(() =>
        this.actions.pipe(
            ofType(OfferActions.updateOffer),
            tap(action => {
                this.offerService.updateOffer(action.offer);
            })
        ),
        { dispatch: false }
    )

}