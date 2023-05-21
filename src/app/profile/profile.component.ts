import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { take } from 'rxjs';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: ProfileType = null;
  // apiProfile: any;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile('f51b0282-5a55-4c98-a50e-8cb5e256bc11')
      .pipe(take(1))
      .subscribe(profile => {
        console.log(profile);
        this.profile = {
          givenName: profile.firstName,
          surname: profile.lastName,
          userPrincipalName: profile.email,
          id: profile.id
        };
      })
  }

  getGraphProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
}
