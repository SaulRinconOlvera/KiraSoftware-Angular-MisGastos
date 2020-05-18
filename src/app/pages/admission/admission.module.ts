import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/shared/tools/http.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CryptoService } from '../../services/shared/tools/crypto.service';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      HttpClientModule,
      RouterModule
    ],
    providers: [
      HttpService,
      CryptoService
    ]
})

export class AdmissionModule { }
