import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { Iphone } from "../../models/iphone.model";
import { IphoneService } from "../../services/iphone.service";
import { startAddIphone, updateIphone } from "../../store/iphone.actions";

@Component({
  selector: "app-edit-iphone-dialog",
  templateUrl: "./edit-iphone-dialog.component.html",
  styleUrls: ["./edit-iphone-dialog.component.css"],
  providers: [IphoneService],
})
export class EditIphoneDialogComponent {
  form!: FormGroup;
  iphone!: Iphone;
  mode!: "create" | "update";
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<EditIphoneDialogComponent>
  ) {
    this.dialogTitle = data.dialogTitle;
    this.iphone = data.iphone;
    this.mode = data.mode;

    const formControls = {
      name: ["", Validators.required],
      price: ["", Validators.required],
      mainImage: ["", ""],
      color: ["", Validators.required],
      screenSize: ["", Validators.required],
      description: ["", Validators.required],
      SKU: ["", Validators.required],
      model: ["", Validators.required],
    };

    if (this.mode == "update") {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.iphone });
    } else if (this.mode == "create") {
      this.form = this.fb.group({
        ...formControls,
      });
    }
  }

  onClose(value: any): void {
    this.dialogRef.close(value);
  }

  onAdd(value: any): void {
    this.onClose(value);
  }


  onSave(): void {
    const formValues = this.form.value;
    const iphone: Iphone = {
      ...formValues,
    };

    if (this.mode == "create") {
      this.store.dispatch(startAddIphone({ iphone }));
    }
    if (this.mode == "update") {
      iphone.id = this.iphone.id;
      this.store.dispatch(updateIphone({ iphone }));
    }
    this.onClose(iphone);
  }
}
