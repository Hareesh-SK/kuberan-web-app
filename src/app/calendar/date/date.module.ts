import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DateComponent } from './date.component';

const routes: Routes = [
  { path: ':date', component: DateComponent }
];

@NgModule({
  declarations: [DateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DateModule { }
