import { Component, HostListener } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  phoneNumber: number = 9363068611;
  password: string = 'Har@0044';
  phoneNumberError: string = '';
  passwordError: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    this.phoneNumberError = '';
    this.passwordError = '';
  }

  async checkAuthenticate() {

      const validate: any = await this.apiService.checkAuthentication(this.phoneNumber, this.password);
      if (validate.success) {
        this.router.navigate(['/main/dashboard']);
        localStorage.setItem('loggedInUser', JSON.stringify(validate.loggedInUser));
      }
      else{
        if(validate.message === 'User not found'){
          this.phoneNumberError = 'User Not Found';
        }
        if(validate.message === 'Invalid password'){
          this.passwordError = 'Invalid password';
        }
      }
    
  }

  loadCreateNewAccount() {
    this.router.navigate(['/create-account']);
  }
}
