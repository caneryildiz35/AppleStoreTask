import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Offer } from "./models/offer.model";
import { OfferState } from "./offer.reducers";

export const selectOfferState = createFeatureSelector<OfferState>("offer");

export const getAllOffers = createSelector(
    selectOfferState,
    (state:OfferState) => state.offers as Offer[]
)