import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { SettingService } from 'src/app/services/pages/account/account.settings.service';
import { PreferencesViewModel } from 'src/data/current-user/proferences.viewmodel';


declare function enable_color_change(): any;
declare function Aplicar_Preferencias(aquien: any): any;

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})

export class AccountSettingsComponent implements OnInit, OnDestroy {

  public preferencias: PreferencesViewModel;

  constructor( public preferencesService: SettingService ) { }

  ngOnInit() {
    enable_color_change();
    this.preferencias = this.preferencesService.cargarPreferencias();
  }

  ngOnDestroy() {
    this.preferencias = this.preferencesService.cargarPreferencias();
    Aplicar_Preferencias(this.preferencias);
  }

  cambiarColor = (tema: any) => {
    let themeName: string = tema.getAttribute('data-logobg');
    if (themeName != null) { this.preferencias.LogoBg = themeName; return; }

    themeName = tema.getAttribute('data-navbarbg');
    if (themeName != null) { this.preferencias.NavbarBg = themeName; return; }

    themeName = tema.getAttribute('data-sidebarbg');
    if (themeName != null) { this.preferencias.SidebarColor = themeName; return; }

    themeName = tema.getAttribute('id');
    if (themeName != null && themeName === 'theme-view') {
      this.preferencias.Theme = tema.checked;  return; }
  }

  guardarCambios = () => this.preferencesService.guardarPreferencias(this.preferencias);
}
