import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { signUp } from "../store/auth.actions";
import { UserModel } from "../models/user.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  form!: FormGroup;
  userModel!: UserModel;
  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  register(): void {
    const val = this.form.value;
    const data: UserModel = {
      ...val,
    };

    this.store.dispatch(signUp({ data }));
  }
}
