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
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  onAccountInfoLoad() {
    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe((status: InteractionStatus) => {

      if (this.authService.instance.getAllAccounts().length > 0) {
        this.router.navigate(['dashboard']);
      } else {
        console.warn('getAllAccounts returned 0');
      }
    })
  }
}
