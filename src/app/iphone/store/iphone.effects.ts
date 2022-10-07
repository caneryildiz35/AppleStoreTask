import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { IphoneService } from "../services/iphone.service";
import { IphoneActions } from "./iphone-action-types";
import { getAllIphones } from "./iphone.selectors";

@Injectable()
export class IphoneEffects {
  constructor(
    private actions: Actions,
    private iphoneService: IphoneService,
    private store: Store
  ) {}

  getIphones = createEffect(() =>
    this.actions.pipe(
      ofType(IphoneActions.getIphones),
      withLatestFrom(this.store.select(getAllIphones)),
      switchMap(() => {
        return this.iphoneService
          .getIphones()
          .pipe(map((iphones) => IphoneActions.setIphones({ iphones })));
      })
    )
  );

  startAddIphone = createEffect(
    () =>
      this.actions.pipe(
        ofType(IphoneActions.startAddIphone),
        switchMap((action) =>
          this.iphoneService
            .addIphone(action.iphone)
            .pipe(map((iphone) => IphoneActions.addIphone({ iphone })))
        )
      ),
    { dispatch: false }
  );

  deleteIphone = createEffect(
    () =>
      this.actions.pipe(
        ofType(IphoneActions.deleteIphone),
        tap((action) => {
          this.iphoneService.deleteIphone(action.iphone);
        })
      ),
    { dispatch: false }
  );

  updateIphone = createEffect(
    () =>
      this.actions.pipe(
        ofType(IphoneActions.updateIphone),
        tap((action) => {
          this.iphoneService.updateIphone(action.iphone);
        })
      ),
    { dispatch: false }
  );
}
