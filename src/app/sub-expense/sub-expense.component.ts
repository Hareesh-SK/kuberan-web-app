import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sub-expense',
  templateUrl: './sub-expense.component.html',
  styleUrls: ['./sub-expense.component.css']
})
export class SubExpenseComponent {
  @Input() textInput: string = ''; // Updated to use input bindings
  @Input() numberInput: number | null = null; // Updated to use input bindings
  @Output() closeModal = new EventEmitter<void>();
  @Output() addSubExpense = new EventEmitter<{ text: string, number: number }>();

  // Method to emit the sub-expense data to the parent component
  onAddSubExpense() {
    if (this.textInput.trim() !== '' && this.numberInput !== null) {
      this.addSubExpense.emit({ text: this.textInput, number: this.numberInput });
      this.textInput = '';
      this.numberInput = null;
    }
  }

  // Method to emit close event to the parent component
  onClose() {
    this.closeModal.emit();
  }
}
