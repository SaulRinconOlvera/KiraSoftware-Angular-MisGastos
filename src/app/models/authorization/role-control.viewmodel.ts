import { BaseViewModel } from 'src/app/models/base/base.viewmodel';
import { RoleViewModel } from './role.viewmodel';
import { ControlViewModel } from '../navegation/control.viewmodel';

export class RoleControlViewModel extends BaseViewModel {
  roleId: number;
  controlId: number;
  applyActionValidations: boolean;
  applySpecialActionValidations: boolean;
  levelAccess: number;
  specialActionsValues: string;
  role: RoleViewModel;
  control: ControlViewModel;
}
