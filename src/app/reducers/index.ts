import { ActionReducerMap } from "@ngrx/store";
import { accessoryReducer } from "../accessory/store/accessory-reducer";
import { authReducer } from "../auth/store/auth.reducer";
import { offerReducer } from "../offer/store/offer.reducers";
export interface AppState {}
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  accessory: accessoryReducer,
  offer: offerReducer,
};
