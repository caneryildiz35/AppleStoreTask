import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Iphone } from "../models/iphone.model";
import { IphoneState } from "./iphone.reducers";


export const selectIphoneState = createFeatureSelector<IphoneState>("iphone");

export const getAllIphones = createSelector(
  selectIphoneState,
  (state: IphoneState) => state.iphones as Iphone[]
);
