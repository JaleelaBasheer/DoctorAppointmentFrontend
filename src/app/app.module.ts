import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DoctorregisterComponent } from './doctorregister/doctorregister.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { ViewdoctorprofileComponent } from './viewdoctorprofile/viewdoctorprofile.component';
import { DoctorindividualprofileComponent } from './doctorindividualprofile/doctorindividualprofile.component';
import { EdituserprofileComponent } from './edituserprofile/edituserprofile.component';
import { EditdoctorprofileComponent } from './editdoctorprofile/editdoctorprofile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { SearchpipePipe } from './pipes/searchpipe.pipe';
import { PipesPipe } from './searchdate/pipes.pipe';
import { ContactComponent } from './contact/contact.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    BookingComponent,
    UserprofileComponent,
    DoctorprofileComponent,
    DoctorregisterComponent,
    FeedbackComponent,
    DoctorloginComponent,
    ViewdoctorprofileComponent,
    DoctorindividualprofileComponent,
    EdituserprofileComponent,
    EditdoctorprofileComponent,
    AdminComponent,
    AdminregisterComponent,
    AdminloginComponent,
    SearchpipePipe,
    PipesPipe,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
    positionClass: 'toast-bottom-center',
    preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
