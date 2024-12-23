import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: number;
  userId: string;
  currentDate: Date = new Date();
  groupedExpenses: { [key: string]: { sub_expense: string; sub_expense_amount: number }[] } = {};

  constructor(private apiService: ApiService) {}

  public async ngOnInit() {
    this.userId = localStorage.getItem('loggedInUser');
    this.loggedInUser = Number(this.userId);

    try {
      const currentDayData: any = await this.apiService.getCurrentDayData(this.loggedInUser);

      this.groupExpensesByMain(currentDayData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  private groupExpensesByMain(data: any[]): void {
    this.groupedExpenses = data.reduce((acc, expense) => {
      if (!acc[expense.main_expense]) {
        acc[expense.main_expense] = [];
      }
      acc[expense.main_expense].push({
        sub_expense: expense.sub_expense,
        sub_expense_amount: expense.sub_expense_amount,
      });
      return acc;
    }, {});
  }

  // Getter to return main expense keys
  get mainExpenseKeys(): string[] {
    return Object.keys(this.groupedExpenses);
  }
}
