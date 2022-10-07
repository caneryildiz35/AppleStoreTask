import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/reducers";
import { EditAccessoryDialogComponent } from "../../components/edit-accessory-dialog/edit-accessory-dialog.component";
import { Accessory } from "../../models/accesory.model";
import { AccessoryService } from "../../services/accessory.service";
import { DialogConfig } from "../../shared/dialog.config";
import { deleteAccessory, getAccessories } from "../../store/accessory-actions";
import { getAllAccessories } from "../../store/accessory.selectors";

@Component({
  selector: "app-list-accessories",
  templateUrl: "./list-accessories.component.html",
  styleUrls: ["./list-accessories.component.css"],
  providers: [AccessoryService],
})
export class ListAccessoriesComponent implements OnInit {
  accessories$!: Observable<Accessory[]>;

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getAccessories());
    this.accessories$ = this.store.select(getAllAccessories);
  }

  addAccessory(): void {
    const dialogConfig = DialogConfig();

    dialogConfig.data = {
      dialogTitle: "Add Accessory",
      mode: "create",
    };
    this.dialog
      .open(EditAccessoryDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

  deleteAccessory(accessory: Accessory): void {
    this.store.dispatch(deleteAccessory({ accessory }));
  }

  editAccessory(accessory: Accessory): void {
    const dialogConfig = DialogConfig();
    dialogConfig.data = {
      dialogTitle: "Edit Accessory",
      accessory,
      mode: "update",
    };

    this.dialog.open(EditAccessoryDialogComponent, dialogConfig);
  }
}
