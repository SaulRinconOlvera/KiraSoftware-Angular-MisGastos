import { NgModule } from '@angular/core';
import { HeaderModule } from './header/header.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { PreferencesComponent } from '../account/preferences/preferences.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        FooterComponent,
        SidebarComponent,
        HeaderComponent,
        PreferencesComponent,
    ],
    exports: [
        BreadcrumbsComponent,
        FooterComponent,
        SidebarComponent,
        HeaderComponent,
        PreferencesComponent,
    ],
    imports: [
        HeaderModule, RouterModule, CommonModule
    ]
})

export class SharedModule { }
