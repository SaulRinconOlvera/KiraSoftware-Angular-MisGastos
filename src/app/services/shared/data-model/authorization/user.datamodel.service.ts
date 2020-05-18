import { DataModelService } from '../base/data-model.service';
import { UserViewModel } from 'src/app/models/authorization/user.viewmodel';
import { HttpService } from 'src/app/services/shared/tools/http.service';
import { ApiServicesEnum } from 'src/app/models/base/enums/api-services.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class UserDataModelService extends DataModelService<UserViewModel>{

  httpLocal: HttpService<UserViewModel>;

  constructor(http: HttpService<UserViewModel>) {
    super(http);
    this.httpLocal = http;
    this.modelType = ApiServicesEnum.User;
  }

  public loginUser = async (model: UserViewModel) => {
    const data = await this.httpLocal.postModel(model, this.modelType, null)
      // tslint:disable-next-line: no-shadowed-variable
      .toPromise<UserViewModel>().then((data: UserViewModel) => data);
    return data;
  }

  public logoutUser = async (model: any) => {
    const data = await this.httpLocal.postGeneric(model, ApiServicesEnum.User_Logout, null)
      // tslint:disable-next-line: no-shadowed-variable
      .toPromise<any>().then((data: any) => data);
    return data;
  }
}
