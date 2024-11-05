import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sub-expense',
  templateUrl: './sub-expense.component.html',
  styleUrls: ['./sub-expense.component.css']
})
export class SubExpenseComponent {

  errorMessage: string = '';
  @Input() textInput: string = '';
  @Input() numberInput: number | null = null;
  @Input() dateInput: Date | null = null; // Accept date input
  @Output() closeModal = new EventEmitter<void>();
  @Output() addSubExpense = new EventEmitter<{ text: string, number: number, date: Date | null }>(); // Include date

  selectedDate: Date | null = null; // New property for the selected date

  ngOnInit() {
    this.selectedDate = this.dateInput; // Initialize with dateInput if available
  }

  onAddSubExpense() {
    if (this.textInput.trim() !== '' && this.numberInput !== null) {
      this.addSubExpense.emit({ text: this.textInput, number: this.numberInput, date: this.selectedDate }); // Emit date
      this.textInput = '';
      this.numberInput = null;
      this.selectedDate = null; // Reset date
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
