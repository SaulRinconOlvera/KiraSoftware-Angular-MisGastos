import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from './crypto.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserViewModel } from 'src/app/models/authorization/user.viewmodel';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionService {
  public user: UserViewModel;
  public useFireChat: boolean;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private crypto: CryptoService) {
      this.useFireChat =
      environment.applicationConfiguration.hasInternetAccess &&
      environment.fireBaseConfiguration.useFireBase &&
      environment.applicationConfiguration.enableChat;
    }

  isLoggedIn(): boolean {
    const userData = localStorage.getItem(environment.localStorageConfiguration.localStorageKeyId) || '';
    if (userData.length > 0) { this.getUserData(userData); }

    return userData.length > 0;
  }

  getUserData(userData: string) {
    this.user = JSON.parse(this.crypto.Descifrar(userData));
  }

  logIn(user: UserViewModel, bySocialNetwork: boolean = false) {
    this.user = user;
    this.user.isLogedBySN = bySocialNetwork;
    localStorage.setItem(environment.localStorageConfiguration.localStorageKeyId,
        this.crypto.Cifrar(JSON.stringify(user))
      );
  }

  logOut(): void {
    localStorage.removeItem(environment.localStorageConfiguration.localStorageKeyId);
    this.user = null;
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  rememberMe(rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem(
        environment.localStorageConfiguration.localStorageRememberMe,
        this.crypto.Cifrar( JSON.stringify(this.user.email))
        );
    } else {
      localStorage.removeItem(environment.localStorageConfiguration.localStorageRememberMe);
    }
  }

  getRememberMe(): string {
    const usertmp = localStorage.getItem(environment.localStorageConfiguration.localStorageRememberMe) || '';
    return  usertmp.length > 0 ?
        this.crypto.Descifrar(usertmp).replace('"', '').replace('"', '') : '';
  }

  private getAvatar(): string {
    let avatar =  this.user.avatar || '';
    const avatarUrl =  this.user.avatarURL || '';

    if (avatarUrl.length > 0) { avatar = this.user.avatarURL; return avatar; }
    if (avatar.length === 0) {
      avatar = environment.applicationConfiguration.defaultUserImage;
    } else {
      avatar = `${environment.applicationConfiguration.apiServerUrl}/file/Download/?fileName=${avatar}`;
    }

    return avatar;
  }
}
