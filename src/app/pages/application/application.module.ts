import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Graficas1Component } from './test/graficas1/graficas1.component';
import { ProgressComponent } from './test/progress/progress.component';
import { CommonModule } from '@angular/common';
import { UbicationModule } from './ubication/ubication.module';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

@NgModule({
    declarations: [
        HomeComponent,
        Graficas1Component,
        ProgressComponent
    ],
    exports: [
        HomeComponent,
        Graficas1Component,
        UbicationModule,
        ProgressComponent
    ],
    imports: [
      CommonModule,
      UbicationModule,
      DxDataGridModule
    ]
})

export class ApplicationModule { }
