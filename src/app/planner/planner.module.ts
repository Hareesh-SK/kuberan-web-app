import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule for icons
import { PlannerComponent } from './planner.component';
import { SubExpenseComponent } from '../sub-expense/sub-expense.component';

const routes: Routes = [
  { path: '', component: PlannerComponent },
];

@NgModule({
  declarations: [
    PlannerComponent,
    SubExpenseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule // Add MatIconModule to imports
  ]
})
export class PlannerModule { }
