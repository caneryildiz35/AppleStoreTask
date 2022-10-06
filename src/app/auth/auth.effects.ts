import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, from, map, switchMap, tap } from "rxjs";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  signUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      map((signUpAction) => signUpAction.data),
      switchMap((data) => {
        return from(
          this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
        ).pipe(
          switchMap((result) => {
            return this.handleSuccessfulAuthentication(result.user);
          }),
          catchError(async (error) => {
            alert("Sign Up Error: "+ error);
            return AuthActions.signupFailed({ data: error });
          })
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      map((loginStartedAction) => loginStartedAction.data),
      switchMap((payload) => {
        return from(
          this.afAuth.signInWithEmailAndPassword(
            payload.email,
            payload.password
          )
        ).pipe(
          switchMap((result) => {
            return this.handleSuccessfulAuthentication(result.user);
          }),
          catchError(async (error) => {
            alert("Login Error: " + error);
            return  AuthActions.loginFailed({ data: error });
          })
        );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        var token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
          this.router.navigateByUrl("list-accessories");
          return AuthActions.loginSucceeded({ data: token });
        }
        return AuthActions.autoLoginFailed();
      })
    )
  );

  autoLoginFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.autoLoginFailed),
        tap(() => {
          this.router.navigate(["login"]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((action) => {
          this.afAuth.signOut();
          localStorage.removeItem("ACCESS_TOKEN");
          this.router.navigateByUrl("/login");
        })
      ),
    { dispatch: false }
  );

  handleSuccessfulAuthentication(user: any) {
    return from(user.getIdToken()).pipe(
      map((token) => {
        var stringToken = token as string;
        localStorage.setItem("ACCESS_TOKEN", stringToken);
        this.router.navigateByUrl("list-accessories");
        return AuthActions.loginSucceeded({ data: token });
      })
    );
  }
}
