import { Component } from '@angular/core';

@Component({
  selector: 'app-response-oidc',
  templateUrl: './response-oidc.component.html',
  styleUrls: ['./response-oidc.component.css']
})
export class ResponseOidcComponent {
  constructor() {
    console.log('Do stuff with the response before redirecting home');
    
  }
}
