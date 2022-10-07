import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { getAccessories } from "../accessory/store/accessory-actions";
import { getIphones } from "../iphone/store/iphone.actions";
import { getOffers } from "./store/offer.actions";



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
