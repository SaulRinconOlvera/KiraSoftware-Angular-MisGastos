import { Injectable } from '@angular/core';
import { DataModelService } from './base/data-model.service';
import { CountryViewModel } from 'src/app/models/ubication/country.viewmodel';
import { ApiServicesEnum } from 'src/app/models/base/enums/api-services.enum';
import { HttpService } from 'src/app/services/shared/tools/http.service';
@Injectable()

export class CountryDataModelService extends DataModelService<CountryViewModel> {
  constructor(http: HttpService<CountryViewModel>) {
    super(http);
    this.modelType = ApiServicesEnum.Country;
  }
}
