import { TestBed } from '@angular/core/testing';

import { ContadorCarritoService } from './contador-carrito.service';

describe('ContadorCarritoService', () => {
  let service: ContadorCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContadorCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
