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
import { getAccessories } from "../accessory/accessory-actions";
import { getIphones } from "../iphone/iphone.actions";
import { getAllAccessories } from "./accessory.selectors";

@Injectable()
export class AccessoryGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select(getAllAccessories).subscribe((result) => {
      if (!result.length) {
        this.store.dispatch(getAccessories());
      }
    });
    return true;
  }
}
