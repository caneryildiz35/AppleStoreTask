import { createAction, props } from "@ngrx/store";
import { Accessory } from "../models/accesory.model";

export const getAccessories = createAction(
  "[List Accessory Page] Get Accessories"
);
export const setAccessories = createAction(
  "[List Accessory Page ] Set Accessories To Store",
  props<{ accessories: Accessory[] }>()
);

export const addAccessory = createAction(
  "[List Accessory Page] Add Accessory",
  props<{ accessory: Accessory }>()
);

export const deleteAccessory = createAction(
  "[List Accessory] Delete Accessory",
  props<{ accessory: Accessory }>()
);

export const updateAccessory = createAction(
  "[List Accessory] Update Accessory",
  props<{ accessory: Accessory }>()
);
