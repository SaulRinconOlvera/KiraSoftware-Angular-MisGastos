import { BaseViewModel } from '../base/base.viewmodel';
import { UserViewModel } from './user.viewmodel';
import { RoleViewModel } from './role.viewmodel';

export class UserRoleViewModel extends BaseViewModel{
  userId: number;
  roleId: number;
  user: UserViewModel;
  role: RoleViewModel;
}
