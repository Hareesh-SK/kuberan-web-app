import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PlannerComponent } from './planner.component';
import { SubExpenseComponent } from '../sub-expense/sub-expense.component';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class PlannerModule { }
