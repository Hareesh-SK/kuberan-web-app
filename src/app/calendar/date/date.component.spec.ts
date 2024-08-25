import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateComponent } from './date.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: (key: string) => '2024-01-01T00:00:00.000Z' }) } }
      ]
    });
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
