import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { cloneDeepWith } from 'lodash';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  user: any = {};
  isEdit: boolean = false;

  userId: string; 
  loggedInUser:number;
  clonedUser: any = {};

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.userId = localStorage.getItem('loggedInUser');
    this.loggedInUser = Number(this.userId);

    const userData: any = await this.apiService.getProfile(this.loggedInUser);
    if(userData){
    this.user = userData.userData || {}; 
    this.clonedUser = cloneDeepWith(this.user);
    }
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  async saveProfile(): Promise<void> {

    const diff = { userId: this.loggedInUser};

    for (const key in this.user) {
    if (this.user.hasOwnProperty(key) && this.clonedUser.hasOwnProperty(key)) {
      if (this.user[key] !== this.clonedUser[key]) {
        diff[key] = this.user[key];
      }
    }
  }
    await this.apiService.updateProfile(diff);
    this.toggleEdit();
  }
}
