import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/pages/pages.services.index';

declare function AdminSettings(settings: any);
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})

export class PagesComponent implements OnInit {

  constructor(public ajustes: SettingService) { }

  ngOnInit() {
    AdminSettings(this.ajustes.cargarPreferencias());
    init_plugins();
  }
}
