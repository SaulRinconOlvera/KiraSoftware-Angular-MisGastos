import { BaseViewModel } from '../base/base.viewmodel';
import { UserRoleViewModel } from './user-role.viewmodel';

export class RoleViewModel extends BaseViewModel {
  name: string;
  normalizedName: string;
  user: UserRoleViewModel[];
}
