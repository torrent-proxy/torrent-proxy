import { TestBed, inject } from '@angular/core/testing';

import { RestClientService } from './rest-client.service';
import { HttpClient } from "@angular/common/http";

describe('RestClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient],
      providers: [RestClientService]
    });
  });

  it('should be created', inject([RestClientService], (service: RestClientService) => {
    expect(service).toBeTruthy();
  }));
});
