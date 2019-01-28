import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookdialogComponent } from './ebookdialog.component';

describe('EbookdialogComponent', () => {
  let component: EbookdialogComponent;
  let fixture: ComponentFixture<EbookdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbookdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
