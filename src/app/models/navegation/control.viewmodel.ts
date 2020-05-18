import { BaseCatalogViewModel } from '../base/base-catalog.viewmodel';
import { RoleControlViewModel } from '../authorization/role-control.viewmodel';

export class ControlViewModel extends BaseCatalogViewModel {
  description: string;
  hasActionValidation: boolean;
  hasSpecialActionValidation: boolean;
  roleControls: RoleControlViewModel[];
}
