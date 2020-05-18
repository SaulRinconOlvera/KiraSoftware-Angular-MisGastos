import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(
    public router: Router,
    public title: Title,
    public meta: Meta) {
    this.getDataRoute() .subscribe(
      data => {
        this.titulo = data.titulo;
        title.setTitle( `${ environment.applicationConfiguration.applicationName } - ${ this.titulo }`);

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.titulo};

        this.meta.updateTag(metaTag);
      }
    );
  }

  ngOnInit() {
  }

  getDataRoute = () => {
    return this.router.events.pipe(
      filter( e =>  e instanceof ActivationEnd),
      filter<ActivationEnd>( e => e.snapshot.data.titulo != null ),
      map((e: ActivationEnd) => e.snapshot.data )
    );
  }
}
