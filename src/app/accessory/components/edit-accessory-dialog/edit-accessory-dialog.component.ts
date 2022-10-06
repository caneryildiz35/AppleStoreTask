import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/reducers";
import { addAccessory, updateAccessory } from "../../accessory-actions";
import { Accessory } from "../../models/accesory.model";
import { AccessoryState } from "../../reducers/accessory-reducer";
import { AccessoryService } from "../../services/accessory.service";

@Component({
  selector: "app-edit-accessory-dialog",
  templateUrl: "./edit-accessory-dialog.component.html",
  styleUrls: ["./edit-accessory-dialog.component.css"],
  providers: [AccessoryService],
})
export class EditAccessoryDialogComponent implements OnInit {
  form!: FormGroup;
  accessory!: Accessory;

  mode!: "create" | "update";
  dialogTitle: string;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<EditAccessoryDialogComponent>
  ) {
    this.dialogTitle = data.dialogTitle;
    this.accessory = data.accessory;
    this.mode = data.mode;
  }

  ngOnInit(): void {
    const formControls = {
      name: ["", Validators.required],
      price: ["", Validators.required],
      SKU: ["", Validators.required],
    };
    this.form = this.fb.group(formControls);
    if (this.mode == "update") {
      this.form.patchValue({ ...this.accessory });
    }
  }

  onClose(value: any) {
    this.dialogRef.close(value);
  }

  onSave() {
    const formValues = this.form.value;
    let accessory: Accessory = {
      ...formValues,
    };
    if (this.mode == "create") {
      this.store.dispatch(addAccessory({ accessory }));
    }
    if (this.mode == "update") {
      accessory.id = this.accessory.id;
      this.store.dispatch(updateAccessory({ accessory }));
    }
    this.dialogRef.close();
  }
}
