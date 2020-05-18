import { BaseViewModel } from '../base/base.viewmodel';
import { UserViewModel } from './user.viewmodel';

export class UserClamViewModel extends BaseViewModel {
  claimType: string;
  claimValue: string;
  userId: number;
  user: UserViewModel;
}
