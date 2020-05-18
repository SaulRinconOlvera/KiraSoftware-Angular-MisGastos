import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ProfileComponent,
        AccountSettingsComponent
    ],
    exports: [
        ProfileComponent
    ],
    imports: [ FormsModule, ReactiveFormsModule, CommonModule, FormsModule]
})

export class AccountModule { }
