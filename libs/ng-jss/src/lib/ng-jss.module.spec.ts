import { async, TestBed } from '@angular/core/testing';
import { NgJssModule } from './ng-jss.module';

describe('NgJssModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgJssModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgJssModule).toBeDefined();
  });
});
