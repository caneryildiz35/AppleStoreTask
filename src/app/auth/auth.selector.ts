import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, getIsAuth } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isAuthenticated = createSelector(selectAuthState, getIsAuth);
