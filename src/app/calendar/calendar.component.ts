import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'] 
})
export class CalendarComponent {

  userId: string;
  loggedInUser: number;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  selectedMonth: string;
  selectedYear: number;

  constructor(private router: Router, private apiService: ApiService) {}

  public async ngOnInit() {
    this.userId = localStorage.getItem('loggedInUser');
    this.loggedInUser = Number(this.userId);
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.selectedMonth = this.months[new Date().getMonth()];
    const currentMonthData: any = await this.apiService.getCurrentMonthData(this.loggedInUser, {
      month: this.selectedMonth,
      year: this.selectedYear,
    });
    console.log('currentMonthData',currentMonthData);
    
  }

  onDateSelected(selectedDate: Date) {
    this.router.navigate(['/main/calendar/date', selectedDate.toISOString()]);
  }
}
