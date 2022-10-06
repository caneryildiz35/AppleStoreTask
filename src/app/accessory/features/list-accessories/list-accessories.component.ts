import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { AppState } from "src/app/reducers";
import { deleteAccessory, getAccessories } from "../../accessory-actions";
import { getAllAccessories } from "../../accessory.selectors";
import { EditAccessoryDialogComponent } from "../../components/edit-accessory-dialog/edit-accessory-dialog.component";
import { Accessory } from "../../models/accesory.model";
import { AccessoryState } from "../../reducers/accessory-reducer";
import { AccessoryService } from "../../services/accessory.service";
import { DialogConfig } from "../../shared/dialog.config";

@Component({
  selector: "app-list-accessories",
  templateUrl: "./list-accessories.component.html",
  styleUrls: ["./list-accessories.component.css"],
  providers: [AccessoryService],
})
export class ListAccessoriesComponent implements OnInit {
  accessories$!: Accessory[];

  constructor(
    private dialog: MatDialog,
    private accessoryService: AccessoryService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAccessories());
    this.store.select(getAllAccessories).subscribe((accessories) => {
      this.accessories$ = accessories;
    });
  }

  addAccessory() {
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

  deleteAccessory(accessory: Accessory) {
    this.store.dispatch(deleteAccessory({ accessory }));
  }

  editAccessory(accessory: Accessory) {
    const dialogConfig = DialogConfig();
    dialogConfig.data = {
      dialogTitle: "Edit Accessory",
      accessory,
      mode: "update",
    };

    this.dialog.open(EditAccessoryDialogComponent, dialogConfig);
  }
}
