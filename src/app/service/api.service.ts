import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private AUTHENTICATE_API = 'http://localhost:3000/api/authenticate';
  private SAVE_USER_API = 'http://localhost:3000/api/saveUser'; 
  private GET_PROFILE_API = 'http://localhost:3000/api/user'; 
  private UPDATE_PROFILE_API = 'http://localhost:3000/api/updateUser'; 

  constructor(private httpClient: HttpClient) {}

  async checkAuthentication(phoneNumber: number, password: string) {
    const authenticationData = { phoneNumber, password };
    const authSub = this.httpClient.post(this.AUTHENTICATE_API, authenticationData);
    const authResp = await firstValueFrom(authSub);
    return authResp;
  }

  async createUser(userData: any) { 
    const saveSub = this.httpClient.post(this.SAVE_USER_API, userData);
    const saveResp = await firstValueFrom(saveSub);
    return saveResp;
  }

  async getProfile(userId: number) { 
    const profileSub = this.httpClient.get(`${this.GET_PROFILE_API}/${userId}`);
    const profileResp = await firstValueFrom(profileSub);
    return profileResp;
  }

  async updateProfile(userData: any) { 
    const updateSub = this.httpClient.post(this.UPDATE_PROFILE_API, userData);
    const updateResp = await firstValueFrom(updateSub);
    return updateResp;
  }
}
