import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Accessory } from "./models/accesory.model";
import { AccessoryState } from "./reducers/accessory-reducer";

export const selectAccessoryState = createFeatureSelector<AccessoryState>("accessory");

export const getAllAccessories = createSelector(
  selectAccessoryState,
  (state: AccessoryState) => state.accessories as Accessory[]
);
