import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { AuthActions } from "./auth/action-types";
import { logout } from "./auth/auth.actions";
import { isAuthenticated } from "./auth/auth.selector";
import { AppState } from "./reducers";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "AppleStore";
  isLoggedIn$!: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());

    this.isLoggedIn$ = this.store.pipe(select(isAuthenticated));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
