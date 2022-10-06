import { createReducer, on } from "@ngrx/store";
import { IphoneActions } from "./iphone-action-types";
import { Iphone } from "./models/iphone.model";

export interface IphoneState {
  iphones: Iphone[];
}

const initialIphoneState: IphoneState = {
  iphones: [],
};

export const iphoneReducer = createReducer(
  initialIphoneState,

  on(IphoneActions.addIphone, (state, action) => {
    return {
      ...state,
      iphones: [...state.iphones, action.iphone],
    };
  }),

  on(IphoneActions.deleteIphone, (state, action) => {
    return {
      iphones: state.iphones.filter((iphone) => iphone.id != action.iphone.id),
    };
  }),

  on(IphoneActions.setIphones, (state, action) => {
    return {
      iphones: action.iphones,
    };
  }),

  on(IphoneActions.getIphones, (state, action) => {
    return {
      ...state,
    };
  })
);
