import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserViewModel } from 'src/app/models/authorization/user.viewmodel';
import { ApiServicesEnum } from 'src/app/models/base/enums/api-services.enum';
import { HttpService } from 'src/app/services/shared/tools/http.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { SessionService } from 'src/app/services/shared/shared.services.index';
import { environment } from 'src/environments/environment';
import { UserLoginViewModel } from 'src/app/models/authorization/user-login.viewmodel';
import { UserClamViewModel } from 'src/app/models/authorization/user-claim.viewmodel';

declare function init_plugins();
declare function help(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMe = false;
  user: string;
  showSocialDiv: boolean;
  showGoogleDiv: boolean;
  showFaceDiv: boolean;
  useFireChat: boolean;

  constructor(
    private http: HttpService<UserViewModel>,
    private router: Router,
    private session: SessionService,
    public afAuth: AngularFireAuth ) {
      this.configureSocialButtons(); }

  ngOnInit() {
    init_plugins();
    help();
    this.checkForRememberMeOnInit();
  }

  login( form: NgForm) {
    if (form.invalid) { return ; }
    const user: UserViewModel = this.createUser(form);
    this.postEntity(user, ApiServicesEnum.User_Login);
  }

  postEntity(user: UserViewModel, action: ApiServicesEnum, params: Map<string, string> = null ) {
    const oldPass = user.passwordHash;

    this.http.postModel(user, action, params)
      .subscribe(
        (entity: UserViewModel) => {
          if (this.session.useFireChat &&
              params === null &&
              entity.claims !== null &&
              entity.claims.find(
                  (e) => e.claimType === environment.fireBaseConfiguration.fireBaseClaim) === null) {
              this.registerLoginOnFireBaseWithEmail(entity.email, oldPass);
          }

          this.session.logIn(entity, params !== null);
          this.session.rememberMe(this.rememberMe);
          this.router.navigate([environment.applicationConfiguration.administrativeHome]);
        }
      );
  }

  private registerLoginOnFireBaseWithEmail(email: string, oldPass: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, oldPass)
      .then((res) => console.log(res))
      .catch((error => console.error(error)));
  }

  checkForRememberMeOnInit() {
    const usertmp = this.session.getRememberMe();
    if (usertmp.length > 0) {
      this.user = usertmp;
      this.rememberMe = true;
    }
  }

  createUser(form: NgForm): UserViewModel {
    return {
      userName: form.value.email,
      email: form.value.email,
      passwordHash: form.value.password
    } as UserViewModel;
  }

  googleLogin() {
    const newUser = new UserViewModel();
    newUser.logins = new Array<UserLoginViewModel>();
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((result: any) => {
      this.postEntity(this.generateUser(result, 'google'),
          ApiServicesEnum.User_Login,
          new Map<string, string>([['origin', 'goggle'], ['action', this.getRights()]])
          );
    })
    .catch(error => console.error(error));
  }

 facebookLogin() {
   this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then((result: any) => {
      this.postEntity(this.generateUser(result, 'facebook'),
          ApiServicesEnum.User_Login,
          new Map<string, string>([['origin', 'facebook'], ['action', this.getRights()]])
          );
    })
    .catch(error => console.error(error));
  }

  twitterLogin() {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider())
    .then(result => console.log(result))
    .catch(error => console.error(error));
  }

  googleLogout() {
    this.afAuth.auth.signOut();
  }

  private getRights(): string {
    return environment.socialNetworks.canCreateUSer ?
        'login_or_create' : 'only_login';
  }

  private generateUser(result: any, origin: string): UserViewModel {
    const newUser = new UserViewModel();
    newUser.logins = new Array<UserLoginViewModel>();
    newUser.claims = new Array<UserClamViewModel>();

    newUser.personName  = result.user.displayName;
    newUser.email = result.user.email;
    newUser.phoneNumber = result.user.phoneNumber;
    newUser.userName = result.user.email;
    newUser.passwordHash = environment.socialNetworks.defaultPassword;

    if (origin === 'google') {
      newUser.alias = result.additionalUserInfo.profile.family_name;
      newUser.avatarURL = result.additionalUserInfo.profile.picture;
    } else {
      newUser.alias = result.additionalUserInfo.profile.last_name;
      newUser.avatarURL = result.additionalUserInfo.profile.picture.data.url;
    }

    this.addUserLoginInformation(result, newUser);
    this.addUserClaimInformation(result, newUser);
    return newUser;
  }

  addUserClaimInformation(result: any, newUser: UserViewModel) {
    const newUserClaim = new UserClamViewModel();
    newUserClaim.claimType = environment.fireBaseConfiguration.fireBaseClaim;
    newUserClaim.claimValue = result.user.uid;
    newUser.claims.push(newUserClaim);
  }

  private addUserLoginInformation(result: any, newUser: UserViewModel) {
    const newUserLogin = new UserLoginViewModel();
    newUserLogin.loginProvider = result.credential.providerId;
    newUserLogin.providerKey = result.additionalUserInfo.profile.id;
    newUserLogin.providerDisplayName = result.user.displayName;

    newUser.logins.push(newUserLogin);
  }

  configureSocialButtons() {
    this.session.useFireChat = environment.fireBaseConfiguration.useFireBase &&
    environment.fireBaseConfiguration.useFireBaseChat;

    this.showSocialDiv =
    environment.socialNetworks.useSocialNetworks &&
    environment.socialNetworks.canLoginUser;

    this.showGoogleDiv =
    environment.socialNetworks.useSocialNetworks &&
    environment.socialNetworks.canLoginUser &&
    environment.socialNetworks.useGoogle &&
    (
      environment.socialNetworks.canLoginUser ||
      environment.socialNetworks.canCreateUSer);

    this.showFaceDiv =
    environment.socialNetworks.useSocialNetworks &&
    environment.socialNetworks.canLoginUser &&
    environment.socialNetworks.useFacebook &&
    (
      environment.socialNetworks.canLoginUser ||
      environment.socialNetworks.canCreateUSer);
  }
}
