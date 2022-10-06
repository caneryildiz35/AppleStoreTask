import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { Offer } from "../../models/offer.model";
import { updateOffer } from "../../offer.actions";

@Component({
  selector: "app-edit-offer-dialog",
  templateUrl: "./edit-offer-dialog.component.html",
  styleUrls: ["./edit-offer-dialog.component.css"],
})
export class EditOfferDialogComponent {
  form!: FormGroup;
  offer!: Offer;
  dialogTitle: string;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<EditOfferDialogComponent>
  ) {
    this.dialogTitle = data.dialogTitle;
    this.offer = data.data;

    const formControls = {
      name: ["", Validators.required],
    };
    this.form = this.fb.group(formControls);
    this.form.patchValue({ ...data.data });
  }

  onClose(value: any) {
    this.dialogRef.close(value);
  }

  onSave() {
    let offer: Offer = {
      id: this.offer.id,
      name: this.form.value.name,
      price: this.offer.price,
      products: this.offer.products,
    };

    this.store.dispatch(updateOffer({ offer }));

    this.dialogRef.close();
  }
}
