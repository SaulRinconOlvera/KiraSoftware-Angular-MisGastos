import { BaseCatalogViewModel } from '../base/base-catalog.viewmodel';
import { CountryViewModel } from './country.viewmodel';
import { CityViewModel } from './city.viewmodel';

export class StateViewModel extends BaseCatalogViewModel {
    CountryId: number;
    Country: CountryViewModel;
    Cities: CityViewModel[];
}
