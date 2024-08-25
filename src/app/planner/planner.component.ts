import { Component } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {
  inputData: string = ''; // Variable to store input data
  dataTree: any[] = []; // Array to store data points and their branches
  showModal: boolean = false; // Control visibility of the modal
  currentParentNode: any = null; // To store the current parent node
  editingNode: any = null; // To store the node being edited
  editedData: string = ''; // To store edited data temporarily
  modalTextInput: string = ''; // Text input for the modal
  modalNumberInput: number | null = null; // Number input for the modal

  // Method to add a new main expense
  addMainExpense() {
    if (this.inputData.trim() !== '') {
      this.dataTree.push({
        data: this.inputData,
        branches: [] // Initialize an empty array for branches
      });
      this.inputData = ''; // Clear the input field after adding data
    }
  }

  // Method to show the modal and set the current parent node for adding sub-expenses
  addSubExpense(parentNode: any) {
    this.currentParentNode = parentNode;
    this.showModal = true;
    this.modalTextInput = ''; // Clear modal input fields
    this.modalNumberInput = null;
  }

  // Method to handle adding a sub-expense from the modal
  onAddSubExpense(subExpenseData: { text: string, number: number }) {
    if (this.currentParentNode) {
      if (this.editingNode) {
        this.editingNode.data = `${subExpenseData.text} (${subExpenseData.number})`;
        this.editingNode = null;
      } else {
        this.currentParentNode.branches.push({
          data: `${subExpenseData.text} (${subExpenseData.number})`,
          branches: [] // Initialize an empty array for branches of the new sub-expense
        });
      }
    }
    this.showModal = false; // Hide the modal after adding sub-expense
  }

  // Method to close the modal
  onCloseModal() {
    this.showModal = false;
    this.editingNode = null;
  }

  // Method to edit a main expense
  editMainExpense(node: any) {
    this.editingNode = node;
    this.editedData = node.data;
  }

  // Method to save edited expense
  saveEditedExpense(node: any) {
    node.data = this.editedData;
    this.editingNode = null;
    this.editedData = '';
  }

  // Method to cancel edit mode
  cancelEdit() {
    this.editingNode = null;
    this.editedData = '';
  }

  // Method to remove a main expense
  removeMainExpense(index: number) {
    this.dataTree.splice(index, 1);
  }

  // Method to edit a sub-expense
  editSubExpense(branch: any) {
    this.modalTextInput = branch.data.split(' (')[0];
    this.modalNumberInput = parseInt(branch.data.split(' (')[1]);
    this.currentParentNode = null; // Ensure we're not adding a new sub-expense
    this.editingNode = branch;
    this.showModal = true;
  }

  // Method to save data (logic will come later)
  saveData() {
    // Logic to save data
    console.log('Data saved:', this.dataTree);
  }
}
