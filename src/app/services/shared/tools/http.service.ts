import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BaseViewModel } from 'src/app/models/base/base.viewmodel';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { ApiServicesEnum } from 'src/app/models/base/enums/api-services.enum';
import { Operation } from 'fast-json-patch' ;
import {  AngularFireStorage } from '@angular/fire/storage';
import * as uuid from 'uuid';
import { SessionService } from './session.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UploadedFileViewModel } from 'src/app/models/base/other/uploaded-file.viewmodel';
import { UploadOnEnum } from 'src/app/models/base/enums/upload-on.enum';

@Injectable()
export class HttpService<T extends BaseViewModel>  {
  private apiServerURL: string = environment.applicationConfiguration.apiServerUrl;

  constructor(private http: HttpClient,
              private session: SessionService,
              private fireStorage: AngularFireStorage) { }

  getModel = (modelId: number, route: ApiServicesEnum): Observable<T> => {
    const url = `${this.apiServerURL}/${route}/${modelId}`;
    return this.http.get<T>(url, this.getHeader()).pipe(catchError(this.handleError));
  }

  getModels = (route: ApiServicesEnum): Observable<T> => {
    const url = `${this.apiServerURL}/${route}`;
    return this.http.get<T>(url, this.getHeader()).pipe(catchError(this.handleError));
  }

  postModel = (model: T, route: ApiServicesEnum, params: Map<string, string> = null): Observable<T> => {
    const paramsString = this.getParams(params);
    const url = `${this.apiServerURL}/${route}${paramsString}`;

    console.log(paramsString);
    console.log(url);

    return this.http.post<T>(url, model, this.getHeader())
        .pipe(catchError(this.handleError));
  }

  postGeneric = (model: any, route: ApiServicesEnum, params: Map<string, string> = null): Observable<any> => {
    const paramsString = this.getParams(params);
    const url = `${this.apiServerURL}/${route}${paramsString}`;
    return this.http.post(url, model, this.getHeader())
        .pipe(catchError(this.handleError));
  }

  pathModel = (modelId: number, document: Operation[], route: ApiServicesEnum): Observable<T> => {
    const url = `${this.apiServerURL}/${route}/${modelId}`;
    return this.http.patch<T>(url, document, this.getHeader())
        .pipe(catchError(this.handleError));
  }

  deleteModel = (modelId: number, route: ApiServicesEnum): Observable<T> => {
    const url = `${this.apiServerURL}/${route}/${modelId}`;
    return this.http.delete<T>(url, this.getHeader())
        .pipe(catchError(this.handleError));
  }

  postFile = (file: File, route: ApiServicesEnum): Observable<T>  => {
    const data = new FormData();
    const url = `${this.apiServerURL}/${route}`;

    data.append('file', file);
    return this.http.post<T>(url, data, this.getHeader())
        .pipe(catchError(this.handleError));
  }

  postImage = (file: File, route: ApiServicesEnum): Promise<UploadedFileViewModel> => {
    if (environment.applicationConfiguration.hasInternetAccess  &&
      environment.fireBaseConfiguration.useFireBase &&
      environment.fireBaseConfiguration.useFireBaseStorage ) {
        return this.postImageToFireBase(file).then(value => value);
      } else { return this.postImageToLocalServer(file, route).then(value => value); }
  }

  private postImageToFireBase(file: File): Promise<UploadedFileViewModel> {
    const fileId: string = uuid.v1();
    const fileName = `${fileId}.png`;

    const test = new Promise((res, rej) => {
      this.fireStorage.upload(`images/${fileName}`, file)
          .then(() => res())
          .catch(() => rej());
    });

    return test.then(
      () =>
        this.fireStorage.ref(`images/${fileName}`).getDownloadURL().toPromise<string>()
          .then(fileUrl1 => ({ fileName, fileUrl: fileUrl1, uploadedOn: UploadOnEnum.FireStore}) as UploadedFileViewModel)
        );
  }

  getParams(params: Map<string, string>): string {
    if (params === null) { return ''; }
    if (params.size === 0) { return ''; }

    let regresa = '?';
    params.forEach((key, value) => regresa = regresa + `${value}=${key}&`);
    return regresa.substring(0, regresa.length - 1);
  }

  private postImageToLocalServer(file: File, route: ApiServicesEnum): Promise<UploadedFileViewModel> {
    let regresa: UploadedFileViewModel = null;

    return this.postFile(file, route).toPromise()
        .then((value: any) => regresa =
        ({ fileName: value.fileName, fileUrl: '', uploadedOn: UploadOnEnum.LocalServer}) as UploadedFileViewModel)
        .catch((error) => { console.log(error); return regresa; })
        .finally(() => regresa );
  }

  // private getToken(isTokenRequired: boolean = true): string {
  //   let token: string = '';

  //   if(!isTokenRequired) { return token; }

  //   const helper = new JwtHelperService();
  //   if(this.session.user && this.session.user.token){ token = this.session.user.token; }
  //   if(token.length !== 0 && !helper.isTokenExpired(token)) { return token; }

  //   if(token.length !== 0) {
  //     const expirationDate = helper.getTokenExpirationDate(token);
  //     const expirationInSecs = Math.ceil((new Date().getTime() - expirationDate.getTime())/60000);

  //     if(expirationInSecs >= 0 ) {

  //       const header = {
  //         headers: new HttpHeaders({
  //           'Content-Type':  'application/json',
  //           'Access-Control-Allow-Headers': '*',
  //         })
  //       };
  //       const model = { CurrentJWToken: token, RefreshToken: 'this.session.user.refresToken.token' };
  //       const paramsString = this.getParams(null);
  //       const url = `${this.apiServerURL}/${ApiServicesEnum.User_RefreshToken}${paramsString}`;

  //       this.http.post(url, JSON.stringify(model), header).pipe(catchError(this.handleError))
  //       .subscribe();

  //       return '';
  //     }
  //   }

  //   return token;
  // }

  private getHeader(isTokenRequired: boolean = true) {

    if(!this.session.user || !this.session.user.token)
    { isTokenRequired = false; }

    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Headers': '*',
        // tslint:disable-next-line: object-literal-key-quotes
        'Authorization': isTokenRequired ? `Bearer ${this.session.user.token}` : ''
      })
    };
  }

  private handleError(error: HttpErrorResponse): Observable<T> {
    //console.log(error);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      swal('Unknow error',  error.error.message , 'error');
    }
    if (error.error instanceof ProgressEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      swal('Unknow error',  error.statusText, 'error');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if(!error.error.errors){
        swal(`Backend returned code ${error.status}`, error.error || 'Bad request, unauthorized or unknow error ', 'error');
      }
      else {
        swal(`Backend returned code ${error.status}`, error.error.title || 'Bad request, unauthorized or unknow error ', 'error');
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      `Backend returned code ${error.status}` + `body was: ${error.error || 'Unknow'}`);
  }
}
