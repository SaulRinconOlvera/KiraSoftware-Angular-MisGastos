import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './pages/shared/shared.module';
import { AdmissionModule } from './pages/admission/admission.module';
import { ApplicationModule } from './pages/application/application.module';
import { ErrorsModule } from './pages/error/errors.module';
import { PagesComponent } from './pages/application/pages.component';
import { AccountModule } from './pages/account/account.module';
import { PagesServicesModule } from './services/pages/pages.services.module';
import { SharedServicesModules } from './services/shared/shared.services.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdmissionModule,
    ApplicationModule,
    ErrorsModule,
    SharedModule,
    AccountModule,
    PagesServicesModule,
    SharedServicesModules,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    DxDataGridModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
