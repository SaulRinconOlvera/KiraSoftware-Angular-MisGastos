import { Injectable } from '@angular/core';
import { CryptoService } from '../../shared/tools/crypto.service';
import { PreferencesViewModel } from 'src/data/current-user/proferences.viewmodel';
import { environment } from 'src/environments/environment';

@Injectable()
export class SettingService {

    constructor(public crypto: CryptoService) { }

    guardarPreferencias = (preferences: PreferencesViewModel): void  => {
        localStorage.setItem(environment.localStorageConfiguration.localStorageSetting,
            this.crypto.Cifrar(JSON.stringify(preferences)));
    }

    cargarPreferencias = (): PreferencesViewModel =>  {
        let preferences: PreferencesViewModel = {
            Id: 0, Theme: true, Layout: 'vertical', LogoBg: 'skin5', NavbarBg: 'skin6', SidebarColor: 'skin5',
            SidebarType: 'full', SidebarPosition: true, HeaderPosition: true, BoxedLayout: false
        };

        if (localStorage.getItem(environment.localStorageConfiguration.localStorageSetting)) {
            preferences = JSON.parse(
              this.crypto.Descifrar(localStorage.getItem(environment.localStorageConfiguration.localStorageSetting)));
        }

        return preferences;
    }
}
