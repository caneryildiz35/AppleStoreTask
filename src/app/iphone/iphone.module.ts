import { NgModule } from "@angular/core";
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
import { ListIphonesComponent } from "./features/list-iphones/list-iphones.component";
import { EditIphoneDialogComponent } from "./components/edit-iphone-dialog/edit-iphone-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { IphoneEffects } from "./iphone.effects";
import { iphoneReducer } from "./iphone.reducers";
import { IphoneService } from "./services/iphone.service";
import { IphoneRoutingModule } from "./iphone.routing.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatDialogModule,
    IphoneRoutingModule,
    MatIconModule,
    StoreModule.forFeature("iphone", iphoneReducer),
    EffectsModule.forFeature([IphoneEffects]),
  ],
  declarations: [ListIphonesComponent, EditIphoneDialogComponent],
  exports: [ListIphonesComponent],
  providers: [IphoneService],
})
export class iPhoneModule {}
