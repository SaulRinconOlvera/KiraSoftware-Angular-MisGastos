import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../tools/session.service';

@Injectable()
export class LoguinGuard implements CanActivate {
  constructor(
    private session: SessionService,
    private router: Router
    ) {}

  canActivate() {
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.session.isLoggedIn();
  }
}
