import { createAction, props } from "@ngrx/store";
import { Offer } from "./models/offer.model";


export const startAddOffer = createAction(  
    "[List Offers Page] Start Add Offer",
    props<{offer:Offer}>()
)
export const getOffers = createAction(  
    "[List Offers Page] Get Offers",
)
export const setOffers = createAction(
    "[List Offers Page ] Set Offers To Store",
    props<{offers:Offer[]}>() 
)

export const addOffer = createAction(
    "[List Offers Page] Add Offer",
    props<{offer:Offer}>()
)

export const deleteOffer = createAction(
    "[List Offers] Delete Offer",
    props<{offer:Offer}>()
)

export const updateOffer = createAction(
    "[List Offers] Update Offer",
    props<{offer:Offer}>()
)