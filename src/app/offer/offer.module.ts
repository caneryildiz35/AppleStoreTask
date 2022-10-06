import {  NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { OfferService } from "./services/offer.services";
import { OfferEffects } from "./offer.effects";
import { offerReducer } from "./offer.reducers";
import { ListOffersComponent } from "./features/list-offers/list-offers.component";
import { EditOfferDialogComponent } from "./components/edit-offer-dialog/edit-offer-dialog.component";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { OfferGuard } from "./offer.guard";
import { OfferRoutingModule } from "./offer.routing.module";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    AngularFireAuthModule,
    OfferRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    StoreModule.forFeature("offer", offerReducer),
    EffectsModule.forFeature([OfferEffects]),
  ],
  declarations: [ListOffersComponent, EditOfferDialogComponent],
  exports: [],
  providers: [OfferService, OfferGuard],
})
export class OfferModule {}
