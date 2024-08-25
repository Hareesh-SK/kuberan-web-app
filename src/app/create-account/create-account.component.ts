import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createForm: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      profession: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  async submitForm() {
    if (this.createForm.valid) {
      try {
        const formData = this.createForm.value;
        await this.apiService.createUser(formData);
        console.log("Form submitted successfully!");
        // Navigate to a success page or another route
        this.router.navigate(['/main/dashboard']);
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle the error appropriately
      }
    } else {
      console.log("Form is invalid!");
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  togglePassword(field: string) {
    if (field === 'password') {
      this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = (this.confirmPasswordFieldType === 'password') ? 'text' : 'password';
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ passwordMismatch: true });
    } else {
      return null;
    }
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      const passwordStrengthRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (!passwordStrengthRegex.test(password)) {
        return { 'pattern': true };
      }
      return null;
    };
  }
}
