import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  userId: string;
  loggedInUser: number;
  reportData: any[] = [];
  displayedColumns: string[] = [];
  orderedKeys: string[] = [];
  years: number[] = [];
  selectedYear: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  selectedMonth: string;

  constructor(private apiService: ApiService, private translate: TranslateService) {}

  public async ngOnInit() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i < currentYear + 20; i++) {
      this.years.push(i);
    }
    this.selectedYear = currentYear;
    this.selectedMonth = this.months[new Date().getMonth()];
    this.userId = localStorage.getItem('loggedInUser');
    this.loggedInUser = Number(this.userId);
    await this.searchMonthReport();
  }

  public processReportData(reportData: any[]): any[] {
    return reportData.map((item) => {
      if (item.full_date) {
        const date = new Date(item.full_date);
        const dayName = this.getDayName(date);
        item.full_date = `${date.getDate()} (${dayName})`;
      } else {
        item.full_date = 'No Date';
      }
      delete item.main_expense_id;
      delete item.month;
      delete item.year;
      delete item.sub_expense_id;
      return item;
    });
  }

  public getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  public async searchMonthReport() {
    const report:any = await this.apiService.getReport(this.loggedInUser, {
      month: this.selectedMonth,
      year: this.selectedYear,
    });

    if (report && report.length > 0) {
      this.reportData = this.processReportData(report);
      this.orderedKeys = [ 
        'full_date',
        'main_expense',
        'main_expense_amount',
        'sub_expense',
        'sub_expense_amount',
      ];
      this.displayedColumns = [
        'Date',
        'Main Expense',
        'Main Expense Amount',
        'Sub Expense',
        'Sub Expense Amount',
      ];
    } else {
      this.reportData = [];
    }
  }
}
