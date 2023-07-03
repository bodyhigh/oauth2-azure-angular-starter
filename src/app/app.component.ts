import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'OAuth2 Azure Starter';
  isIframe = false;
  isLoggedIn = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private broadcastService: MsalBroadcastService, private authService: MsalService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })
  }

  login() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect();
  }

  setLoginDisplay() {
    console.log("START [setLoginDisplay]");
    let accountCount = this.authService.instance.getAllAccounts().length;
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    this.isLoggedIn = accountCount > 0;
    console.log(`accountCount: ${accountCount}`);
    console.log("END [setLoginDisplay]");
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  // foo() {
  //   this.broadcastService.inProgress$
  //   .pipe(
  //     // filter((status: InteractionStatus) => status === InteractionStatus.None),
  //     takeUntil(this._destroying$)
  //   )
  //   .subscribe((status: InteractionStatus) => {
  //     console.log(`STATUS: ${status}`);
  //   })
  // }
}
