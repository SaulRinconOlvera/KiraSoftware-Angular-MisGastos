import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserViewModel } from 'src/app/models/authorization/user.viewmodel';
import { ApiServicesEnum } from 'src/app/models/base/enums/api-services.enum';
import { AngularFireAuth } from '@angular/fire/auth';
import swal from 'sweetalert';
import { SessionService } from 'src/app/services/shared/tools/session.service';
import { HttpService } from 'src/app/services/shared/tools/http.service';
import { UserClamViewModel } from 'src/app/models/authorization/user-claim.viewmodel';
import { environment } from 'src/environments/environment';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
    private session: SessionService,
    public firebase: AngularFireAuth,
    private http: HttpService<UserViewModel>,
    private http1: HttpService<UserClamViewModel>
    ) { }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      iAgree: new FormControl(false)
    }, { validators: this.checkForSamePass('password', 'password2') });
  }

  checkForSamePass(field1: string, field2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if (pass1 !== pass2) {
        return { checkForSamePass: true };
      }
    };
  }

  registerUser() {

    if (this.form.invalid) { return; }

    if (!this.form.value.iAgree) {
      swal('Important', 'You must be accept the page terms and conditions.', 'warning');
      return;
    }

    const user: UserViewModel = this.createUser();
    const oldPass = user.passwordHash;

    this.http.postModel(user, ApiServicesEnum.User)
      .subscribe(
        (entity: UserViewModel) => {
          if (this.session.useFireChat) {
            this.registerFireBaseUser(entity.email, oldPass, entity);
          } else {
            swal('User created', user.email, 'success');
          }
        }
      );
  }

  registerFireBaseUser(email: string, oldPass: string, user: UserViewModel) {
    if (this.session.useFireChat) {
      this.firebase.auth.createUserWithEmailAndPassword(email, oldPass)
        .then((res: any) => {
          this.updateUser(res, user);
        })
        .catch((error) => console.error(error));
      }
  }

  updateUser(res: any, user: UserViewModel) {
    const claim = {
      userId: user.id,
      claimType: environment.fireBaseConfiguration.fireBaseClaim,
      claimValue: res.user.uid} as UserClamViewModel;

    this.http1.postModel(claim, ApiServicesEnum.UserClaim)
      .subscribe(
        () => swal('User created', user.email, 'success')
      );
  }

  copyUser(user: UserViewModel) {
    return {
      id: user.id,
      userName: user.userName,
      normalizedUserName: user.normalizedUserName,
      email: user.email,
      personName: user.personName,
      alias: user.alias,
      avatar: user.avatar,
      avatarURL: user.avatarURL,
      normalizedEmail: user.normalizedEmail,
      passwordHash: user.passwordHash,
      securityStamp: user.securityStamp,
      phoneNumber: user.phoneNumber,
      phoneNumberConfirmed: user.phoneNumberConfirmed,
      twoFactorEnabled: user.twoFactorEnabled,
      lockoutEnabled: user.lockoutEnabled,
      accessFailedCount: user.accessFailedCount,
      rolesNames: user.rolesNames,
      roles: user.roles,
      logins: user.logins,
      claims: user.claims,
      token: user.token,
      isLogedBySN: user.isLogedBySN
    } as UserViewModel;
  }

  createUser(): UserViewModel {
    return {
      userName: this.form.value.name,
      email: this.form.value.email,
      passwordHash: this.form.value.password
    } as UserViewModel;
  }
}
