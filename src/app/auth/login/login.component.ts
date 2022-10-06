import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { login } from "../auth.actions";
import { UserModel } from "../models/user.model";
import { AppState } from "src/app/reducers";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, public store: Store<AppState>) {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    const val = this.form.value;
    let data: UserModel = {
      ...val,
    };
    console.log(data);

    this.store.dispatch(login({ data }));
  }
}
