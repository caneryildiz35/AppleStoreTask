import { ActionReducerMap } from "@ngrx/store";
import { accessoryReducer } from "../accessory/reducers/accessory-reducer";
import { authReducer } from "../auth/reducers";
import { offerReducer } from "../offer/offer.reducers";

export interface AppState {

}
export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    accessory: accessoryReducer,
    offer:offerReducer
};
