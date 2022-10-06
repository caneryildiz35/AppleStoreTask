import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListAccessoriesComponent } from "./features/list-accessories/list-accessories.component";

const routes: Routes = [
    {
      path: '',
      component: ListAccessoriesComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AccessoryRoutingModule { }