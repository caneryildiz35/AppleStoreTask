import { importType } from '@angular/compiler/src/output/output_ast';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAccessoriesComponent } from './accessory/features/list-accessories/list-accessories.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListIphonesComponent } from './iphone/features/list-iphones/list-iphones.component';
import { ListOffersComponent } from './offer/features/list-offers/list-offers.component';
import { OfferGuard } from './offer/offer.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'list-accessories',
    loadChildren:()=> import('./accessory/accessory.module').then(m => m.AccessoryModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'list-iphones',
    loadChildren:()=> import('./iphone/iphone.module').then(m => m.iPhoneModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list-offers',
    loadChildren:() => import('./offer/offer.module').then(m => m.OfferModule),
    canActivate: [OfferGuard, AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
