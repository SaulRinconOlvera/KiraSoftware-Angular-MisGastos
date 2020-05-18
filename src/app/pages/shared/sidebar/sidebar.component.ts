import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/shared/shared.services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  ngOnInit() {
  }

}
