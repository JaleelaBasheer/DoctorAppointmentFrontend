import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { BookingComponent } from './booking/booking.component';
import { DoctorregisterComponent } from './doctorregister/doctorregister.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { DoctorloginComponent } from './doctorlogin/doctorlogin.component';
import { ViewdoctorprofileComponent } from './viewdoctorprofile/viewdoctorprofile.component';
import { DoctorindividualprofileComponent } from './doctorindividualprofile/doctorindividualprofile.component';
import { AdminComponent } from './admin/admin.component';
import { EditdoctorprofileComponent } from './editdoctorprofile/editdoctorprofile.component';
import { EdituserprofileComponent } from './edituserprofile/edituserprofile.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"user/login", component:LoginComponent
  },
  {
    path:"user/doctorlogin", component:DoctorloginComponent
  },
  {
    path:"user/register", component:RegisterComponent
  },
  {
    path:"user/doctorprofile",component:DoctorprofileComponent
  },
  {
    path:"user/userprofile", component:UserprofileComponent
  },
  {
    path:"user/booking", component:BookingComponent
  },
  {
    path:"user/doctorregister", component:DoctorregisterComponent
  },
  {
    path:"user/feedback", component:FeedbackComponent
  },
  {
    path:"user/viewdoctorprofile/:id", component:ViewdoctorprofileComponent
  },
  {
    path:"user/doctorindividualprofile", component:DoctorindividualprofileComponent
  },
  {
    path:"user/admin", component:AdminComponent
  },
  {
    path:"user/adminregister", component:AdminregisterComponent
  },
  {
    path:"user/adminlogin", component:AdminloginComponent
  },
  {
    path:"user/editdoctor/:_id", component:EditdoctorprofileComponent
  },
  {
    path:"user/edituser/:_id", component:EdituserprofileComponent
  },
  {
    path:"user/contact", component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
