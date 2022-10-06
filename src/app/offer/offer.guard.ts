import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { getAccessories } from "../accessory/accessory-actions";
import { getIphones } from "../iphone/iphone.actions";
import { getOffers } from "./offer.actions";

@Injectable()
export class OfferGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(getAccessories());
    this.store.dispatch(getIphones());
    this.store.dispatch(getOffers());
    return true;
  }
}
