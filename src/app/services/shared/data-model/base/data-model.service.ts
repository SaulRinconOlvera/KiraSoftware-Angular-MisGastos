import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/models/base/base.viewmodel';
import { ApiServicesEnum } from 'src/app/models/base/enums/api-services.enum';
import { HttpService } from 'src/app/services/shared/tools/http.service';

import swal from 'sweetalert';
import { compare } from 'fast-json-patch';

@Injectable()
export class DataModelService<T extends BaseViewModel>
{
  protected modelType: ApiServicesEnum;

  constructor(private http: HttpService<T>) { }

  //  Get View Model
  public getViewModel = async (id: number) => {
    const model = await this.http.getModel(id, this.modelType)
      .toPromise<T>().then((data) => data);
    return model;
  }

  public getAllModels = async () => {
    const model: Array<T> = await this.http.getModels(this.modelType)
      .toPromise().then((data: any) => data);
    return model;
  }

  public postViewModel = async (model: T, params: Map<string, string> = null) => {
    const datta = await this.http.postModel(model, this.modelType, params)
      .toPromise<T>().then((data) => data);
    return datta;
  }

  public pathViewModel = async (oldModel: T, newModel: T) => {
    const document = compare(oldModel, newModel).filter((f) => f.op === 'replace');

    if(document.length === 0) { return; }
    const model = await this.http.pathModel(oldModel.id, document, this.modelType)
      .toPromise<T>().then((data) => data);
    return model;
  }

  public deleteViewModel = async (modelId: number) => {
    const model = await this.http.deleteModel(modelId, this.modelType)
        .toPromise<T>().then((data) => {
          swal('The information has been deleted!', { icon: 'success', });
          return data;
        });
    return model;
  }

  public deleteViewModelWithQuestion = async (modelId: number) => {
    const response: boolean = await  swal(this.getOptionsDelete())
    .then((willDelete: boolean) => willDelete);
    return response;
  }

  private getOptionsDelete = () => {
    return {
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this information!',
      icon: 'warning', dangerMode: true,
      buttons: {
        cancel: {
          visible: true,
          className: 'btn green btn-danger'
        },
        confirm: { className: 'btn red btn-success' }
      }
    };
  }
}
