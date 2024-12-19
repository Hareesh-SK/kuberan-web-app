import { Component } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {
  inputData: string = '';
  monthlyIncome: number | null = null;
  dataTree: any[] = [];
  showModal: boolean = false;
  currentParentNode: any = null;
  editingNode: any = null;
  editedData: string = '';
  modalTextInput: string = '';
  modalNumberInput: number | null = null;
  modalDateInput: Date | null = null;
  userId: string; 
  years: number[] = [];
  selectedYear: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedMonth: string;

  constructor(private apiService: ApiService) {
    this.userId = localStorage.getItem('loggedInUser');
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    // Populate years array from the current year to 10 years ahead
    for (let i = currentYear; i < currentYear + 20; i++) {
      this.years.push(i);
    }
    // Default selected year to current year
    this.selectedYear = currentYear;
    this.selectedMonth = this.months[new Date().getMonth()];
  }

  addMainExpense() {
    if (this.inputData.trim() !== '') {
      this.dataTree.push({
        data: this.inputData,
        main_expense_amount: 0,
        branches: []
      });
      this.inputData = '';
    }
  }

  addSubExpense(node: any) {
    this.currentParentNode = node;
    this.editingNode = null; // Reset edit mode
    this.modalTextInput = '';
    this.modalNumberInput = null;
    this.modalDateInput = null;
    this.showModal = true;
  }

  onAddSubExpense(subExpenseData: { text: string; number: number; date: Date | null }) {
    if (this.editingNode) {
      // Find the parent node in dataTree and update the specific branch entry
      const parentNode = this.dataTree.find(node =>
        node.branches.includes(this.editingNode)
      );
  
      if (parentNode) {
        // Update the branch data and date
        this.editingNode.data = `${subExpenseData.text} (${subExpenseData.number})`;
        this.editingNode.date = subExpenseData.date;
  
        // Update main expense total for the parent node
        parentNode.main_expense_amount = this.calculateSubExpenseTotal(parentNode);
      }
  
      this.editingNode = null;
    } else if (this.currentParentNode) {
      // Adding a new sub-expense
      this.currentParentNode.branches.push({
        data: `${subExpenseData.text} (${subExpenseData.number})`,
        date: subExpenseData.date,
        branches: []
      });
  
      // Update main expense total for the current parent node
      this.currentParentNode.main_expense_amount = this.calculateSubExpenseTotal(this.currentParentNode);
    }
  
    // Update the Total Remaining Income after the edit
    this.calculateRemainingIncome();
    this.showModal = false;
  }

  calculateRemainingIncome(): number {
    const totalExpenses = this.dataTree.reduce((sum, node) => sum + node.main_expense_amount, 0);
    return this.monthlyIncome ? this.monthlyIncome - totalExpenses : 0;
  }

  onCloseModal() {
    this.showModal = false;
    this.editingNode = null;
  }

  editMainExpense(node: any) {
    this.editingNode = node;
    this.editedData = node.data;
  }

  saveEditedExpense(node: any) {
    node.data = this.editedData; // Save only the edited main expense name
    this.editingNode = null;      // Clear editing node state
    this.editedData = '';         // Clear temporary edited data
  }

  cancelEdit() {
    this.editingNode = null;
    this.editedData = '';
  }

  removeMainExpense(index: number) {
    this.dataTree.splice(index, 1);
    this.calculateRemainingIncome(); // Update after removal
  }

  editSubExpense(branch: any) {
    this.modalTextInput = branch.data.split(' (')[0];
    this.modalNumberInput = parseInt(branch.data.split(' (')[1]);
    this.modalDateInput = branch.date || null;
    this.currentParentNode = null; // Avoid affecting add mode
    this.editingNode = branch; // Set the editing node to current branch
    this.showModal = true;
  }

  removeSubExpense(parentNode: any, branch: any) {
    const index = parentNode.branches.indexOf(branch);
    if (index >= 0) {
      parentNode.branches.splice(index, 1);
    }
    parentNode.main_expense_amount = this.calculateSubExpenseTotal(parentNode);
    this.calculateRemainingIncome(); // Update remaining income after removal
  }

  calculateSubExpenseTotal(node: any): number {
    if (!node) return 0;
    return node.branches.reduce((total: number, branch: any) => {
      const amount = parseInt(branch.data.split('(')[1]);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  }

  public async saveData() {
    let plannerData = cloneDeep(this.dataTree);
    plannerData.forEach(node => {
      node.main_expense = node.data;
      node.sub_expenses = node.branches;
      node.month = this.selectedMonth; 
      node.year = this.selectedYear;
      delete node.data;
      delete node.branches;
  
      node.sub_expenses.forEach(branch => {
          if (branch.data) {
              // Split data to get sub_expense and sub_expense_amount
              const [sub_expense, sub_expense_amount] = branch.data.match(/(.*) \((\d+)\)/).slice(1, 3);
              branch.sub_expense = sub_expense;
              branch.sub_expense_amount = parseInt(sub_expense_amount);
  
              // Add month and year from sub_expense_date, then delete sub_expense_date
              if (branch.date) {
                  const date = new Date(branch.date);
                  branch.full_date = date;
                  branch.date = date.getDate();
                  branch.month = date.getMonth() + 1; // Adding 1 as getMonth() is zero-based
                  branch.year = date.getFullYear();
              }else{
                delete branch.date;
              }
              delete branch.data;
              delete branch.branches;
          }
      });
  });
  if(plannerData && plannerData.length > 0){
    await this.apiService.saveMonthPlan(this.userId, plannerData);
  }
  }
}
