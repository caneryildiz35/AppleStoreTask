import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../action-types";

export interface AuthState {
  isAuthenticated: boolean;
  loginErrorMessage?: string;
  signupErrorMessage?: string;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  loginErrorMessage: "",
  signupErrorMessage: "",
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
    };
  }),

  on(AuthActions.loginSucceeded, (state, action) => ({
    ...state,
    loginErrorMessage: "",
    isAuthenticated: true,
  })),
  
  on(AuthActions.loginFailed, (state, action) => ({
    ...state,
    loginErrorMessage: action.data,
  })),

  on(AuthActions.signUp, (state, action) => ({
    ...state,
    signupErrorMessage: "",
  })),


  on(AuthActions.signupFailed, (state, action) => ({
    ...state,
    signupErrorMessage: action.data,
  })),

  on(AuthActions.logout, (state, action) => ({
    ...state,
    isAuthenticated: false,
  }))
);

export const getIsAuth = (state: AuthState) => state.isAuthenticated;
