import { BaseViewModel } from '../base/base.viewmodel';
import { UserViewModel } from './user.viewmodel';

export class UserLoginViewModel extends BaseViewModel {
  loginProvider: string;
  providerKey: string;
  providerDisplayName: string;
  userId: number;
  user: UserViewModel;
}
