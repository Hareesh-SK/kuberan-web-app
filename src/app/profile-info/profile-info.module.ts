import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ProfileInfoComponent } from './profile-info.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProfileInfoComponent },
];

@NgModule({
  declarations: [ProfileInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    RouterModule.forChild(routes)
  ]
})
export class ProfileInfoModule { }
