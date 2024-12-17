import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { cloneDeepWith } from 'lodash';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  profileForm: FormGroup;
  user: any = {};
  isEdit: boolean = false;
  noChangesMessage: string = ''; // New variable for message
  clonedUser: any = {};
  userId: string; 
  loggedInUser: number;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    // Initialize the form with default values
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email_id: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      profession: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.userId = localStorage.getItem('loggedInUser');
    this.loggedInUser = Number(this.userId);

    const userData: any = await this.apiService.getProfile(this.loggedInUser);
    if (userData) {
      this.user = userData.userData || {}; 
      this.clonedUser = cloneDeepWith(this.user);
      this.populateForm(); // Populate the form with user data
    }
  }

  populateForm() {
    this.profileForm.patchValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      age: this.user.age,
      phone_number: this.user.phone_number,
      email_id: this.user.email_id,
      city: this.user.city,
      profession: this.user.profession
    });
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
    this.noChangesMessage = ''; // Clear message when toggling edit
    if (!this.isEdit) {
      this.profileForm.patchValue(this.user);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.valid) {
      let hasChanges = false;
      const diff: any = { userId: this.loggedInUser };

      for (const key in this.profileForm.value) {
        if (this.profileForm.value[key] !== this.clonedUser[key]) {
          diff[key] = this.profileForm.value[key];
          hasChanges = true; // Mark that there are changes
        }
      }

      if (hasChanges) {
        await this.apiService.updateProfile(diff);
        // Update user with the new values
        this.user = { ...this.user, ...diff };
        this.clonedUser = cloneDeepWith(this.user);
        this.noChangesMessage = ''; // Clear message if changes are made
        this.toggleEdit(); // Exit edit mode
      } else {
        this.noChangesMessage = 'No changes made in any fields'; // Show message
        this.isEdit = true; // Keep the form in edit mode
      }
    }
  }
}
