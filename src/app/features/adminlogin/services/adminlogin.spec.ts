import { TestBed } from '@angular/core/testing';

import { AdminLoginService } from './adminlogin.service';

describe('LoginService', () => {
  let service: AdminLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
