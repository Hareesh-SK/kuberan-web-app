import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


const routes: Routes = [
  { path: '', component: ReportComponent },
];

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportModule { }
