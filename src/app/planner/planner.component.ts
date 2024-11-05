import { Component } from '@angular/core';
import { cloneDeep } from 'lodash';

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

  modalDateInput: Date | null = null; // Ensure this is a Date type or null


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
    this.currentParentNode = node; // Capture the parent node
    this.modalTextInput = ''; // Reset text input
    this.modalNumberInput = null; // Reset number input
    this.modalDateInput = null; // Reset date input
    this.showModal = true; // Show the modal
  }

  onAddSubExpense(subExpenseData: { text: string; number: number; date: Date | null }) {
    if (this.editingNode) {
      this.editingNode.data = `${subExpenseData.text} (${subExpenseData.number})`;
      this.editingNode.date = subExpenseData.date; // Use Date type directly
      this.editingNode = null;
    } else {
      this.currentParentNode.branches.push({
        data: `${subExpenseData.text} (${subExpenseData.number})`,
        date: subExpenseData.date, // Ensure this is Date type
        branches: []
      });
    }
    this.currentParentNode.main_expense_amount = this.calculateSubExpenseTotal(this.currentParentNode);
    this.showModal = false;
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
    node.data = this.editedData;
    node.main_expense_amount = this.editedData;
    this.editingNode = null;
    this.editedData = '';
  }

  cancelEdit() {
    this.editingNode = null;
    this.editedData = '';
  }

  removeMainExpense(index: number) {
    this.dataTree.splice(index, 1);
  }

  editSubExpense(branch: any) {
    this.modalTextInput = branch.data.split(' (')[0];
    this.modalNumberInput = parseInt(branch.data.split(' (')[1]);
    this.modalDateInput = branch.date || null; // Populate date input with existing date
    this.currentParentNode = null;
    this.editingNode = branch;
    this.showModal = true;
  }

  removeSubExpense(parentNode: any, branch: any) {
    const index = parentNode.branches.indexOf(branch);
    if (index >= 0) {
      parentNode.branches.splice(index, 1);
    }
    parentNode.main_expense_amount = this.calculateSubExpenseTotal(parentNode);
  }

  calculateSubExpenseTotal(node: any): number {
    return node.branches.reduce((total: number, branch: any) => {
      const amount = parseInt(branch.data.split('(')[1]);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  }

  calculateRemainingIncome(): number {
    const totalExpenses = this.dataTree.reduce((sum, node) => sum + node.main_expense_amount, 0);
    return this.monthlyIncome ? this.monthlyIncome - totalExpenses : 0;
  }

  saveData() {
    let plannerData = cloneDeep(this.dataTree);
    plannerData.forEach(node => {
      node.main_expense = node.data;
      node.sub_expenses = node.branches;
      delete node.data;
      delete node.branches;
  
      node.sub_expenses.forEach(branch => {
        if (branch.data) {
          const [sub_expense, sub_expense_amount] = branch.data.match(/(.*) \((\d+)\)/).slice(1, 3);
          branch.sub_expense = sub_expense;
          branch.sub_expense_amount = parseInt(sub_expense_amount);
          branch.sub_expense_date = branch.date || null; // Ensure date is saved
          delete branch.data;
          delete branch.branches;
          delete branch.date;
        }
      });
    });
  
    console.log(plannerData); // For debugging, to see saved planner data with date
  }
}
