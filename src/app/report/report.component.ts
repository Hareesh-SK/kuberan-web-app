import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { groupBy } from "lodash";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  userId: string;
  loggedInUser: number;
  reportData: any;
  displayedColumns: any;
  monthTables: any;
  years: number[] = [];
  selectedYear: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedMonth: string;


  constructor(private apiService: ApiService) {}
  public async ngOnInit(){

    const currentYear = new Date().getFullYear();
    // Populate years array from the current year to 10 years ahead
    for (let i = currentYear; i < currentYear + 20; i++) {
      this.years.push(i);
    }
    // Default selected year to current year
    this.selectedYear = currentYear;
    this.selectedMonth = this.months[new Date().getMonth()];

    this.userId = localStorage.getItem('loggedInUser');
    this.loggedInUser = Number(this.userId);

    const currentDate = new Date(); // Get the current date
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    this.selectedMonth = this.months[currentMonth-1];
    this.selectedYear = currentDate.getFullYear();

    this.reportData = await this.apiService.getReport(this.loggedInUser,{month:this.selectedMonth,year:this.selectedYear});
    this.reportData = this.processReportData(this.reportData );
    this.displayedColumns = Object.keys(this.reportData[0]);
  
  }

  public processReportData(reportData: any[]): any[] {
    return reportData.map((item) => {
      if (item.full_date) {
        // Extract the day and the date from full_date and return formatted string
        const date = new Date(item.full_date);
        const dayName = this.getDayName(item.full_date);
        const formattedDate = `${date.getDate()}(${dayName})`; // Format as "24(Tuesday)"
        return { ...item, full_date: formattedDate }; // Update full_date property
      }
      return { ...item, full_date: "No Date" }; // Return the object unchanged if no full_date
    });
  }
  public getDayName(fullDate: string): string {
    const date = new Date(fullDate); // Parse the full_date string
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()]; // Get the day of the week
  }

  public async searchMonthReport(){

    this.reportData = await this.apiService.getReport(this.loggedInUser,{month:this.selectedMonth,year:this.selectedYear});
    if(this.reportData.length > 0){
      this.reportData = this.processReportData(this.reportData );
      this.displayedColumns = Object.keys(this.reportData[0]);
    }
  }
}
