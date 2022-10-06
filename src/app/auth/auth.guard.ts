import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, take, tap } from "rxjs";
import { isAuthenticated } from "./auth.selector";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(isAuthenticated).pipe(take(1));
  }
}
