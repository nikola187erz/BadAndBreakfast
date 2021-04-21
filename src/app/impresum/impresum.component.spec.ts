import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresumComponent } from './impresum.component';

describe('ImpresumComponent', () => {
  let component: ImpresumComponent;
  let fixture: ComponentFixture<ImpresumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpresumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpresumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
