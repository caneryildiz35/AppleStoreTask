import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListIphonesComponent } from "./features/list-iphones/list-iphones.component";


const routes: Routes = [
    {
      path: '',
      component: ListIphonesComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class IphoneRoutingModule { }