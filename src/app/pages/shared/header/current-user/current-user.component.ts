import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/shared/tools/session.service';
import { UserViewModel } from 'src/app/models/authorization/user.viewmodel';
import { TokenInformationViewModel } from 'src/app/models/base/other/token-information.viewmodel';
import { UserDataModelService } from 'src/app/services/shared/data-model/authorization/user.datamodel.service';


@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styles: []
})
export class CurrentUserComponent implements OnInit {

  constructor(
    public session: SessionService,
    private userService: UserDataModelService) { }

  ngOnInit() {
  }

  onSelectOption() {
    document.querySelector('#user_dropdown').removeAttribute('style');
  }

  onLogOut() {
    this.userService.logoutUser(this.getDataToken(this.session.user));
    this.session.logOut();
  }

  private getDataToken(user: UserViewModel): TokenInformationViewModel {
    const dataToken = {
      currentJWToken: user.token,
      refreshToken: user.refreshToken.token,
      userId: user.id
    } as TokenInformationViewModel;

    return dataToken;
  }
}
