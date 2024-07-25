import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let serviceMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
    });
    service = TestBed.inject(UsersService);
    serviceMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
