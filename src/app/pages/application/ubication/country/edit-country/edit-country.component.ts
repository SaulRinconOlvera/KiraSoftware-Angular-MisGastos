import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CountryDataModelService } from 'src/app/services/shared/data-model/country.datamodel.service';
import { CountryViewModel } from 'src/app/models/ubication/country.viewmodel';

declare function help(): any;

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styles: []
})
export class EditCountryComponent implements OnInit {

  form: FormGroup;
  country: CountryViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CountryDataModelService
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl( null,
        [Validators.required, Validators.maxLength(100)]),
      shortName: new FormControl(null, [Validators.maxLength(10)])
    });

    const id = Number(this.route.snapshot.params.id) || 0;
    this.getCountry(id);
  }

  async getCountry(id: number) {
    if(id === 0) { return; }

    this.country = await this.service.getViewModel(id);
    this.form.setValue(
      {
        id: this.country.id,
        name: this.country.name,
        shortName: this.country.shortName
    });

    help();
  }

  async saveModel() {
    if(this.form.invalid) { return; }
    const newModel = this.form.value as CountryViewModel;
    newModel.id = newModel.id || 0;

    if(!this.country) { await this.service.postViewModel(newModel); }
    else { await this.service.pathViewModel(this.country, newModel); }
    this.cancel();
  }

  createCountry(form: NgForm): CountryViewModel {
    return {
      id: form.value.id || 0,
      name: form.value.name,
      shortName: form.value.shortName
    } as CountryViewModel;
  }

  cancel() {
    this.router.navigate(['/countries']);
  }
}
