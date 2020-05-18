import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { Graficas1Component } from './test/graficas1/graficas1.component';
import { ProgressComponent } from './test/progress/progress.component';
import { ProfileComponent } from '../account/profile/profile.component';
import { AccountSettingsComponent } from '../account/account-settings/account-settings.component';
import { LoguinGuard } from 'src/app/services/shared/shared.services.index';
import { ListCountriesComponent } from './ubication/country/list-countries/list-countries.component';
import { EditCountryComponent } from './ubication/country/edit-country/edit-country.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoguinGuard ],
    children: [
      { path: 'home', component: HomeComponent, data: { titulo: 'Home' } },
      { path: 'graficas', component: Graficas1Component, data: { titulo: 'Gráficas' } },
      { path: 'countries', component: ListCountriesComponent, data: { titulo: 'Countries' } },
      { path: 'country/:id', component: EditCountryComponent, data: { titulo: 'Country' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil' } },
      { path: 'settings', component: AccountSettingsComponent, data: { titulo: 'Preferencias' } },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutesModule { }
