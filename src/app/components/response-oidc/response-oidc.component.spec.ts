import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseOidcComponent } from './response-oidc.component';

describe('ResponseOidcComponent', () => {
  let component: ResponseOidcComponent;
  let fixture: ComponentFixture<ResponseOidcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseOidcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseOidcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
