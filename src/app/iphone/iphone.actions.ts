import { createAction, props } from "@ngrx/store";
import { Iphone } from "./models/iphone.model";

export const startAddIphone = createAction(  
    "[List Iphones Page] Start Add Iphone",
    props<{iphone:Iphone}>()
)
export const getIphones = createAction(  
    "[List Iphones Page] Get Iphones",
)
export const setIphones = createAction(
    "[List Iphones Page ] Set Iphones To Store",
    props<{iphones:Iphone[]}>()  
)

export const addIphone = createAction(
    "[List Iphones Page] Add Iphone",
    props<{iphone:Iphone}>()
)

export const deleteIphone = createAction(
    "[List Iphones] Delete Iphone",
    props<{iphone:Iphone}>()
)

export const updateIphone = createAction(
    "[List Iphones] Update Iphone",
    props<{iphone:Iphone}>()
)