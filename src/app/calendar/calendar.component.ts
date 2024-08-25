import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(private router: Router) {}

  onDateSelected(selectedDate: Date) {
    this.router.navigate(['/main/calendar/date', selectedDate.toISOString()]);
  }
}
