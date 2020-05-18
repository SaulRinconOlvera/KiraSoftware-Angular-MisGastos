import { Component } from '@angular/core';
import { ApiServicesEnum } from 'src/app/models/base/enums/api-services.enum';

declare function help(): any;
import swal from 'sweetalert';
import { HttpService } from 'src/app/services/shared/tools/http.service';
import { CountryViewModel } from 'src/app/models/ubication/country.viewmodel';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styleUrls: ['./graficas1.component.css']
})
export class Graficas1Component {

  public countries;
  public options;

  constructor(private http: HttpService<CountryViewModel>) {
    this.getCountries();
    help();
  }

  areYouSure = (e) => {
    const id = e.row.values[0];
    swal(this.getOptions())
    .then((willDelete) => {
      if (willDelete) { this.deleteUser(id); }
    });
  }

  private getOptions = () => {
    return {
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this information!',
      icon: 'warning', dangerMode: true,
      buttons: {
        cancel: {
          visible: true,
          className: 'btn green btn-danger'
        },
        confirm: { className: 'btn red btn-success' }
      }
    };
  }

  private deleteUser = (id: any) => {
    this.http.deleteModel(id, ApiServicesEnum.Country)
      .toPromise().then(
        () => {
          swal('The information has been deleted!', { icon: 'success', });
          this.getCountries();
        }
      );
  }

  private getCountries = () => {
    this.http.getModels(ApiServicesEnum.Country).toPromise()
      .then((res) => this.countries = res);
  }
}
