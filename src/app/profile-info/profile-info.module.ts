import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule for input fields
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for buttons
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
    MatInputModule, 
    MatButtonModule, 
    RouterModule.forChild(routes)
  ]
})
export class ProfileInfoModule { }
