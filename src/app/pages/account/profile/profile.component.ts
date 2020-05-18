import { Component, OnInit } from '@angular/core';
import { UserViewModel } from 'src/app/models/authorization/user.viewmodel';
import { ApiServicesEnum } from 'src/app/models/base/enums/api-services.enum';
import { compare } from 'fast-json-patch';
import swal from 'sweetalert';
import { SessionService, HttpService } from 'src/app/services/shared/shared.services.index';

declare function help(): any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: UserViewModel;
  public updateForm: boolean;
  public imageToUpload: File;
  public imageTemporal: string;

  ngOnInit(): void {
    help();
  }

  constructor(
    public session: SessionService,
    public http: HttpService<UserViewModel>) {
    this.user = session.user;
  }

  guardar(userForm: UserViewModel) {

    if (this.imageToUpload) { userForm.avatar = this.imageToUpload.name;
    } else { userForm.avatar = this.user.avatar; }


    const res = compare(this.user, userForm).filter((f) => f.op === 'replace');
    if (res.length === 0) {
      swal('Warning', 'You do not have modified anything.', 'warning');
      return;
    }

    this.updateForm = true;

    //  Update Photo
    if (this.imageToUpload) { this.upLoadPhoto(userForm); } else { this.updateUser(userForm); }
  }

  updateUser(userForm: UserViewModel) {
    const res = compare(this.user, userForm).filter((f) => f.op === 'replace');
    this.imageToUpload = null;

    this.http.pathModel(this.user.id, res, ApiServicesEnum.User)
      .subscribe(
        (entity: UserViewModel) => {
          this.session.logIn(entity);
          this.user = this.session.user;
          swal('Updated', 'User profile updated.', 'success');
          this.updateForm = false;
        }, () => this.updateForm = false
      );
  }

  onFileSelect(file: File) {
    this.imageToUpload = file;
    this.imageTemporal = null;
    if (!file) { return; }

    if (file.type.indexOf('image') < 0) {
      swal('Error', 'You only can upload images file types', 'error');
      this.imageToUpload = null;
      return;
    }

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imageTemporal = reader.result.toString();
  }

  upLoadPhoto(userForm: UserViewModel) {

    this.http.postImage(this.imageToUpload, ApiServicesEnum.User_UploadFile).then(
      (value) => {
        userForm.avatar = value.fileName;
        userForm.avatarURL = value.fileUrl;
        this.updateUser(userForm);
       });

    // if (environment.applicationConfiguration.hasInternetAccess &&
    //   environment.fireBaseConfiguration.useFireBase &&
    //   environment.fireBaseConfiguration.useFireBaseStorage) {

    //   } else {
    //   this.http.postFile(this.imageToUpload, ApiServicesEnum.User_UploadFile)
    //     .subscribe(
    //       (resultado: any) => this.updateUser(userForm, resultado.fileName),
    //       (error: any) => { console.log(error); this.updateUser(userForm, null); }
    //     );
    // }

  }
}
