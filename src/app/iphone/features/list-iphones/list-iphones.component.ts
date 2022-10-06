import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DialogConfig } from "src/app/accessory/shared/dialog.config";
import { EditIphoneDialogComponent } from "../../components/edit-iphone-dialog/edit-iphone-dialog.component";
import { deleteIphone, getIphones } from "../../iphone.actions";
import { getAllIphones } from "../../iphone.selectors";
import { Iphone } from "../../models/iphone.model";
import { IphoneService } from "../../services/iphone.service";

@Component({
  selector: "app-list-iphones",
  templateUrl: "./list-iphones.component.html",
  styleUrls: ["./list-iphones.component.css"],
  providers: [IphoneService],
})
export class ListIphonesComponent implements OnInit {
  iphones$!: Observable<Iphone[]>;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getIphones());
    this.iphones$ = this.store.select(getAllIphones);
  }

  addIphone(): void {
    const dialogConfig = DialogConfig();

    dialogConfig.data = {
      dialogTitle: "Add iPhone",
      mode: "create",
    };
    this.dialog
      .open(EditIphoneDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

  deleteIphone(iphone: Iphone): void {
    this.store.dispatch(deleteIphone({ iphone }));
  }

  editIphone(iphone: Iphone): void {
    const dialogConfig = DialogConfig();

    dialogConfig.data = {
      dialogTitle: "Edit iPhone",
      iphone,
      mode: "update",
    };

    this.dialog.open(EditIphoneDialogComponent, dialogConfig);
  }
}
