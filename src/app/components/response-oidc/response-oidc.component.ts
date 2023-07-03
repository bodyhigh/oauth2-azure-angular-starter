import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-response-oidc',
  templateUrl: './response-oidc.component.html',
  styleUrls: ['./response-oidc.component.css']
})
export class ResponseOidcComponent implements OnInit, OnDestroy{
  private readonly _destroying$ = new Subject<void>();

  constructor(private router: Router, private broadcastService: MsalBroadcastService, private authService: MsalService) {
  }

  ngOnInit() {
    console.log('Do stuff with the response before redirecting home');
    this.onAccountInfoLoad();

    // setTimeout(() => {
    //   console.log('TIMEOUT COMPLETE');
    //   this.redirectOnComplete();

    // }, 5000);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  redirectOnComplete(): void {
    console.log("redirectOnComplete");
    this.router.navigate(['dashboard']);
  };

  onAccountInfoLoad() {
    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe((status: InteractionStatus) => {
      console.log(`OIDC STATUS: ${status}`);
      console.log(`OIDC accountCount: ${this.authService.instance.getAllAccounts().length}`);

      if (this.authService.instance.getAllAccounts().length > 0) {
        this.redirectOnComplete();
      }
    })
  }
}
