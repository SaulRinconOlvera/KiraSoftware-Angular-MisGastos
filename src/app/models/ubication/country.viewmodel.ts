import { BaseCatalogViewModel } from '../base/base-catalog.viewmodel';
import { StateViewModel } from './state.viewmodel';

export class CountryViewModel extends BaseCatalogViewModel {
    States: StateViewModel[];
}
