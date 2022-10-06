import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./auth.guard";
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AuthEffects } from "./auth.effects";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([AuthEffects]),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  providers: [AuthGuard],
})
export class AuthModule {}
