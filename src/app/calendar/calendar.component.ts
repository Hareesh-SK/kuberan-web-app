import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarDates: { day: number }[] = [];
  totalRemainingIncome = 0;
  totalRemainingIncomePerDay = 0;
  selectedMonthNumber: number;
  selectedYear: number;
  today: number;
  userId: string;
  loggedInUser: number;

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    const currentDate = new Date();
    this.today = currentDate.getDate();
    this.selectedMonthNumber = currentDate.getMonth();
    this.selectedYear = currentDate.getFullYear();
    this.userId = localStorage.getItem('loggedInUser') || '0';
    this.loggedInUser = Number(this.userId);

    await this.loadCurrentMonthData();
    this.generateCalendar(this.selectedYear, this.selectedMonthNumber);
  }

  async loadCurrentMonthData() {
    const monthName = this.months[this.selectedMonthNumber];
    const currentMonthData: any = await this.apiService.getCurrentMonthData(this.loggedInUser, { month: monthName, year: this.selectedYear });

    this.totalRemainingIncome = currentMonthData[0]?.total_remaining_income || 0;
    const remainingDays = this.daysInMonth(this.selectedYear, this.selectedMonthNumber) - this.today + 1;
    this.totalRemainingIncomePerDay = Math.floor(this.totalRemainingIncome / remainingDays);
  }

  generateCalendar(year: number, month: number) {
   // Create an empty array to store calendar dates
    this.calendarDates = [];

    // Add padding days to align the start day of the month
    const paddingDays = this.getPaddingDays(year, month);
    for (let i = 0; i < paddingDays; i++) {
      this.calendarDates.push({ day: null });
    }

    // Add the actual days of the current month
    const totalDays = this.daysInMonth(year, month);
    for (let day = 1; day <= totalDays; day++) {
      this.calendarDates.push({ day });
    }

  }

  isDateInCurrentOrFuture(day: number): boolean {
    const selectedDate = new Date(this.selectedYear, this.selectedMonthNumber, day);
    const today = new Date(this.selectedYear, this.selectedMonthNumber, this.today);
    return selectedDate >= today;
  }

  isCompletedDate(day: number): boolean {
    const selectedDate = new Date(this.selectedYear, this.selectedMonthNumber, day);
    return selectedDate < new Date();
  }

  prevMonth() {
    this.selectedMonthNumber = (this.selectedMonthNumber === 0) ? 11 : this.selectedMonthNumber - 1;
    this.selectedYear -= (this.selectedMonthNumber === 11) ? 1 : 0;
    this.generateCalendar(this.selectedYear, this.selectedMonthNumber);
  }

  nextMonth() {
    this.selectedMonthNumber = (this.selectedMonthNumber === 11) ? 0 : this.selectedMonthNumber + 1;
    this.selectedYear += (this.selectedMonthNumber === 0) ? 1 : 0;
    this.generateCalendar(this.selectedYear, this.selectedMonthNumber);
  }

  private daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getPaddingDays(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }
}
