import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileInfoModule } from './profile-info/profile-info.module';
import { PlannerModule } from './planner/planner.module';
import { CalendarModule } from './calendar/calendar.module';
import { MatIconModule } from '@angular/material/icon';
import { ReportModule } from './report/report.module';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpConfigInterceptor } from './service/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    LogoutConfirmationDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    ProfileInfoModule,
    PlannerModule,
    CalendarModule,
    ReportModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
