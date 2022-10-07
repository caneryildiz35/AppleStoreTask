import { createReducer, on } from "@ngrx/store";
import { Offer } from "../models/offer.model";
import { OfferActions } from "./offer-action-types";

export interface OfferState {
  offers: Offer[];
}

const initialOfferState: OfferState = {
  offers: [],
};

export const offerReducer = createReducer(
  initialOfferState,

  on(OfferActions.addOffer, (state, action) => {
    return {
      ...state,
      offers: [...state.offers, action.offer],
    };
  }),

  on(OfferActions.deleteOffer, (state, action) => {
    return {
      ...state,
      offers: state.offers.filter((offer) => offer.id != action.offer.id),
    };
  }),

  on(OfferActions.setOffers, (state, action) => {
    return {
      offers: action.offers,
    };
  }),

  on(OfferActions.getOffers, (state, action) => {
    return {
      ...state,
    };
  })
);
