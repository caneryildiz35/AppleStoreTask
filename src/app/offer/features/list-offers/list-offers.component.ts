import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Accessory } from "src/app/accessory/models/accesory.model";
import { DialogConfig } from "src/app/accessory/shared/dialog.config";
import { getAllAccessories } from "src/app/accessory/store/accessory.selectors";
import { Iphone } from "src/app/iphone/models/iphone.model";
import { getAllIphones } from "src/app/iphone/store/iphone.selectors";
import { EditOfferDialogComponent } from "../../components/edit-offer-dialog/edit-offer-dialog.component";
import { Offer } from "../../models/offer.model";
import { OfferService } from "../../services/offer.services";
import { deleteOffer, startAddOffer } from "../../store/offer.actions";
import { getAllOffers } from "../../store/offer.selectors";

@Component({
  selector: "app-list-offers",
  templateUrl: "./list-offers.component.html",
  styleUrls: ["./list-offers.component.css"],
  providers: [OfferService],
})
export class ListOffersComponent implements OnInit {
  iphoneFormController = new FormControl();
  accessoryFormController = new FormControl();
  nameFormController = new FormControl();

  totalPrice: number = 0;

  accessories$!: Observable<Accessory[]>;
  offers$!: Observable<Offer[]>;
  iphones$!: Observable<Iphone[]>;
  productNames: string[] = [];
  displayedColumns: string[] = ["name", "price", "products", "actions"];

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.offers$ = this.store.select(getAllOffers);
    this.accessories$ = this.store.select(getAllAccessories);
    this.iphones$ = this.store.select(getAllIphones);
  }

  deleteOffer(offer: Offer): void {
    this.store.dispatch(deleteOffer({ offer }));
  }

  updateOffer(offer: Offer): void {
    const dialogConfig = DialogConfig();
    dialogConfig.data = {
      dialogTitle: "Update Offer",
      data: offer,
    };
    this.dialog
      .open(EditOfferDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

  selectionChanged(): void {
    this.productNames = [];
    this.totalPrice = 0;
    let accessories: Accessory[] = this.accessoryFormController.value;
    let iphones: Iphone[] = this.iphoneFormController.value;

    if (accessories)
      accessories.forEach((element) => {
        this.totalPrice += element.price;
        this.productNames.push(element.name);
      });
    if (iphones)
      iphones.forEach((element) => {
        this.totalPrice += element.price;
        this.productNames.push(element.name);
      });
    this.totalPrice = this.totalPrice * 0.8;
  }

  addOffer(): void {
    let offerName = this.nameFormController.value;

    let offer: Offer = {
      name: offerName,
      price: this.totalPrice,
      products: this.productNames,
    };

    this.store.dispatch(startAddOffer({ offer }));

    this.accessoryFormController.reset();
    this.iphoneFormController.reset();
    this.nameFormController.reset();
    this.totalPrice = 0;
    this.productNames = [];
  }
}
