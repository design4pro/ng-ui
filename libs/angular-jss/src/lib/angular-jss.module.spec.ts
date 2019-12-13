import { async, TestBed } from '@angular/core/testing';
import { AngularJssModule } from './angular-jss.module';

describe('AngularJssModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularJssModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AngularJssModule).toBeDefined();
  });
});
