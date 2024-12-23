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
  private SAVE_MONTH_PLAN_API = 'http://localhost:3000/api/saveMonthPlan'; 
  private GET_REPORT_API = 'http://localhost:3000/api/getReport'; 

  private GET_CURRENT_DAY_DATA_API = 'http://localhost:3000/api/getCurrentDayData'; 
  private GET_CURRENT_MONTH_DATA_API = 'http://localhost:3000/api/getCurrentMonthData'; 




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

  async saveMonthPlan(userId: any, plannerData: any) { 
    const planSub = this.httpClient.post(`${this.SAVE_MONTH_PLAN_API}/${userId}`,plannerData);
    const planResp = await firstValueFrom(planSub);
    return planResp;
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

  public async getReport(userId: number,searchData:any){
    const reportSub = this.httpClient.post(`${this.GET_REPORT_API}/${userId}`,searchData);
    const reportResp = await firstValueFrom(reportSub);
    return reportResp;
  }
  public async getCurrentDayData(userId: number) { 
    const currentDataSub = this.httpClient.get(`${this.GET_CURRENT_DAY_DATA_API}/${userId}`);
    const currentDataResp = await firstValueFrom(currentDataSub);
    return currentDataResp;
  }
  public async getCurrentMonthData(userId: number, searchData:any) { 
    const currentMonthDataSub = this.httpClient.post(`${this.GET_CURRENT_MONTH_DATA_API}/${userId}`,searchData);
    const currentMonthDataResp = await firstValueFrom(currentMonthDataSub);
    return currentMonthDataResp;
  }
}
