import { BaseCatalogViewModel } from '../base/base-catalog.viewmodel';
import { StateViewModel } from './state.viewmodel';

export class CityViewModel extends BaseCatalogViewModel {
    StateId: number;
    State: StateViewModel;
}
