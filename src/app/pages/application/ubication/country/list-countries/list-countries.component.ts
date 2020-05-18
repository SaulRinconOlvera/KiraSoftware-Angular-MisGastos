import { Component } from '@angular/core';
import { CountryViewModel } from 'src/app/models/ubication/country.viewmodel';
import { Router } from '@angular/router';
import { CountryDataModelService } from 'src/app/services/shared/data-model/country.datamodel.service';

declare function help(): any;

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styles: []
})
export class ListCountriesComponent {
  public dataGrid: any; //DxDataGridComponent;

  public countries: Array<CountryViewModel>;
  public options;

  constructor(
    private service: CountryDataModelService,
    private router: Router) {
    this.getCountries();
    help();
  }

  saveGridInstance(e) {
    this.dataGrid = e.component; //as DxDataGridComponent;
  }

  addNew() {
    this.router.navigate(['/country/0']);
  }

  onEdit = (e) => {
    const id = e.row.values[0];
    this.router.navigate([`/country/${id}`]);
  }

  onDelete = async (e) => {
    const id = e.row.values[0];
    if ( await this.service.deleteViewModelWithQuestion(id)) {
      await this.service.deleteViewModel(id);
      await this.getCountries();
    }
  }

  private getCountries = async () => {
    this.countries = await this.service.getAllModels();
  }

  onChangeSearch(text1: string) {
    this.dataGrid.searchByText(text1);
  }

  // export(fileType: string) {
  //   swal(this.getOptionsExport(fileType))
  //   .then((exportTrue) => {
  //     if (exportTrue) { this.exportToLocal(fileType); }
  //   });
  // }

  // exportToLocal(fileType: string): any {
  //   //this.dataGrid.exportToExcel(false);
  // }

   // private getOptionsExport = (fileType: string) => {
  //   return {
  //     title: `Export to ${ fileType} file.`,
  //     text: 'Do you want export this information to local file?',
  //     icon: 'warning', dangerMode: true,
  //     buttons: {
  //       cancel: {
  //         visible: true,
  //         className: 'btn green btn-danger'
  //       },
  //       confirm: { className: 'btn red btn-success' }
  //     }
  //   };
  // }

}

