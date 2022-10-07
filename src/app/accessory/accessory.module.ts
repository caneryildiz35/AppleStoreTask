import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ListAccessoriesComponent } from "./features/list-accessories/list-accessories.component";
import { EditAccessoryDialogComponent } from "./components/edit-accessory-dialog/edit-accessory-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AccessoryService } from "./services/accessory.service";
import { AccessoryRoutingModule } from "./accessory.routing.module";
import { accessoryReducer } from "./store/accessory-reducer";
import { AccessoryEffects } from "./store/accessory.effects";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    AccessoryRoutingModule,
    MatIconModule,
    RouterModule.forChild([]),
    AngularFirestoreModule,
    StoreModule.forFeature("accessory", accessoryReducer),
    EffectsModule.forFeature([AccessoryEffects]),
  ],
  declarations: [ListAccessoriesComponent, EditAccessoryDialogComponent],
  exports: [ListAccessoriesComponent],
  providers: [AccessoryService],
})
export class AccessoryModule {}
