import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { AccessoryService } from "../services/accessory.service";
import { AccessoryActions } from "./accessory-action-types";
import { getAllAccessories } from "./accessory.selectors";


@Injectable()
export class AccessoryEffects {
  constructor(
    private actions: Actions,
    private accessoryService: AccessoryService,
    private store: Store
  ) {}

  getAccessories = createEffect(() =>
    this.actions.pipe(
      ofType(AccessoryActions.getAccessories),
      withLatestFrom(this.store.select(getAllAccessories)),
      switchMap(([action, accessories]) => {
        return this.accessoryService
          .getAccessories()
          .pipe(
            map((accessories) =>
              AccessoryActions.setAccessories({ accessories })
            )
          );
      })
    )
  );

  addAccessory = createEffect(
    () =>
      this.actions.pipe(
        ofType(AccessoryActions.addAccessory),
        tap((action) => {
          this.accessoryService.addAccessory(action.accessory);
        })
      ),
    { dispatch: false }
  );

  deleteAccessory = createEffect(
    () =>
      this.actions.pipe(
        ofType(AccessoryActions.deleteAccessory),
        tap((action) => {
          this.accessoryService.deleteAccessory(action.accessory);
        })
      ),
    { dispatch: false }
  );

  updateAccessory = createEffect(
    () =>
      this.actions.pipe(
        ofType(AccessoryActions.updateAccessory),
        tap((action) => {
          this.accessoryService.updateAccessory(action.accessory);
        })
      ),
    { dispatch: false }
  );
}
