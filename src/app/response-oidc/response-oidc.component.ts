import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response-oidc',
  templateUrl: './response-oidc.component.html',
  styleUrls: ['./response-oidc.component.css']
})
export class ResponseOidcComponent {
  constructor(private router: Router) {
    console.log('Do stuff with the response before redirecting home');

    this.redirectHome();
  }

  redirectHome() {
    this.router.navigate(['']);
  }
}
