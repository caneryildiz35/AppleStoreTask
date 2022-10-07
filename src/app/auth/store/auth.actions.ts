import { createAction, props } from "@ngrx/store";
import { UserModel } from "../models/user.model";

export const signUp = createAction(
  "[Auth] Sign Up Started",
  props<{ data: UserModel }>()
);
export const signupSucceeded = createAction(
  "[Auth] Sign Up Succeeded",
  props<{ data: UserModel }>()
);
export const signupFailed = createAction(
  "[Auth] Sign Up Failed",
  props<{ data: string }>()
);

export const login = createAction(
  "[Auth] User Login Started",
  props<{ data: UserModel }>()
);
export const loginSucceeded = createAction(
  "[Auth] Login Succeeded",
  props<{ data: any }>()
);
export const loginFailed = createAction(
  "[Auth] Login Failed",
  props<{ data: string }>()
);
export const setUser = createAction("[Auth] Set User ", props<{ data: any }>());

export const logout = createAction("[Auth] Logout");
export const autoLogin = createAction("[Auth] Auto Login Started");

export const autoLoginSuccess = createAction("[Auth] Auto Login Succeeded");

export const autoLoginFailed = createAction("[Auth] Auto Login Failed");
