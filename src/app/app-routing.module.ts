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
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'list-accessories',
    component: ListAccessoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-iphones',
    component: ListIphonesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-offers',
    component: ListOffersComponent,
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
