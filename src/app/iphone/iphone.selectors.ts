import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IphoneState } from "./iphone.reducers";
import { Iphone } from "./models/iphone.model";

export const selectIphoneState = createFeatureSelector<IphoneState>("iphone");

export const getAllIphones = createSelector(
  selectIphoneState,
  (state: IphoneState) => state.iphones as Iphone[]
);
