import { NgModule } from '@angular/core';
import { CryptoService, HttpService, MenuService, LoguinGuard, SessionService } from './shared.services.index';
import { CountryDataModelService } from './data-model/country.datamodel.service';
import { UserDataModelService } from './data-model/authorization/user.datamodel.service';

@NgModule ({
    providers: [
      CryptoService, HttpService, MenuService,
      LoguinGuard, SessionService, CountryDataModelService,
      UserDataModelService
    ]
})

export class SharedServicesModules { }
