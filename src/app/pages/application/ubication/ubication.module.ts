import { NgModule } from '@angular/core';
import { ListCountriesComponent } from './country/list-countries/list-countries.component';
import { EditCountryComponent } from './country/edit-country/edit-country.component';
import { EditStateComponent } from './state/edit-state/edit-state.component';
import { ListStateComponent } from './state/list-state/list-state.component';
import { ListCitiesComponent } from './city/list-cities/list-cities.component';
import { EditCityComponent } from './city/edit-city/edit-city.component';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListCountriesComponent,
    EditCountryComponent,
    EditStateComponent,
    ListStateComponent,
    ListCitiesComponent,
    EditCityComponent
  ],
  exports: [
    ListCountriesComponent,
    EditCountryComponent,
    EditStateComponent,
    ListStateComponent,
    ListCitiesComponent,
    EditCityComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    DxDataGridModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ]
})

export class UbicationModule { }
