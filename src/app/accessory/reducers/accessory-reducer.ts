import { createReducer, on } from "@ngrx/store";
import { AccessoryActions } from "../accessory-action-types";
import { Accessory } from "../models/accesory.model";

export interface AccessoryState {
  accessories: Accessory[];
}

const initialAccessorryState: AccessoryState = {
  accessories: [],
};

export const accessoryReducer = createReducer(
  initialAccessorryState,

  on(AccessoryActions.addAccessory, (state, action) => {
    return {
      ...state,
      accessories: [...state.accessories, action.accessory],
    };
  }),

  on(AccessoryActions.deleteAccessory, (state, action) => {
    return {
      ...state,
      accessories: state.accessories?.filter(
        (accessory) => accessory.id != action.accessory.id
      ),
    };
  }),

  on(AccessoryActions.setAccessories, (state, action) => {
    return {
      ...state,
      accessories: action.accessories,
    };
  })
);
