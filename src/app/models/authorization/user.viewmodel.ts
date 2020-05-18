import { BaseViewModel } from '../base/base.viewmodel';
import { UserRoleViewModel } from './user-role.viewmodel';
import { UserLoginViewModel } from './user-login.viewmodel';
import { UserClamViewModel } from './user-claim.viewmodel';
import { RefresTokenViewModel } from './refresh-token.viewmodel';

export class UserViewModel extends BaseViewModel {
  userName: string;
  normalizedUserName: string;
  email: string;
  personName: string;
  alias: string;
  avatar: string;
  avatarURL: string;
  normalizedEmail: string;
  passwordHash: string;
  securityStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  rolesNames: string;
  roles: UserRoleViewModel[];
  logins: UserLoginViewModel[];
  claims: UserClamViewModel[];
  refreshToken: RefresTokenViewModel;
  token: string;
  isLogedBySN: boolean;
}
