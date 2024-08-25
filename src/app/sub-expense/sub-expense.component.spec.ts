import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubExpenseComponent } from './sub-expense.component';

describe('SubExpenseComponent', () => {
  let component: SubExpenseComponent;
  let fixture: ComponentFixture<SubExpenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubExpenseComponent]
    });
    fixture = TestBed.createComponent(SubExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
