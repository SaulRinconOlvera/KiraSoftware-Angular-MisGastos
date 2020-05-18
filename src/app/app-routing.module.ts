import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/admission/login/login.component';
import { RegisterComponent } from './pages/admission/register/register.component';
import { PagenotfoundComponent } from './pages/error/pagenotfound/pagenotfound.component';
import { PagesRoutesModule } from './pages/application/pages.routes';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), PagesRoutesModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
