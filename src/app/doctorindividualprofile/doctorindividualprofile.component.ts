import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-doctorindividualprofile',
  templateUrl: './doctorindividualprofile.component.html',
  styleUrls: ['./doctorindividualprofile.component.css']
})
export class DoctorindividualprofileComponent implements OnInit {

  constructor(private toaster:ToasterService, private dashboardrouter:Router, private appointmentrouter:Router, private api:ApiService){}
  id:string=""
  userid:string=""
  user:string=""
  image:string = ""
  number:string=""
  password:any=""
  email:string=""
  department:string=""
  education:string=""
  experience:string=""
  address:string=""
  place:string=""
  specilization:any=""


  ngOnInit(): void {
    this.id =localStorage.getItem("loginUserid")||""
    console.log(this.id);
    
    this.userid= localStorage.getItem("loginUser_id")||""
        console.log(this.userid);

    this.user= localStorage.getItem("loginUsername")||""
    this.password= localStorage.getItem("loginUserpassword")||""
    this.image= localStorage.getItem("loginUserimage")||""
    this.email= localStorage.getItem("loginUseremail")||""
    this.image= localStorage.getItem("loginUserimage")||""
    this.number= localStorage.getItem("loginUsernumber")||""
    this.department= localStorage.getItem("loginUserdepartment")||""
    this.education= localStorage.getItem("loginUsereducation")||""
    this.experience= localStorage.getItem("loginUserexperience")||""
    this.address= localStorage.getItem("loginUseraddress")||""
    this.place= localStorage.getItem("loginUserplace")||""
    this.specilization= localStorage.getItem("loginUserspecilization")||""
  }

  logout(){
    localStorage.removeItem("token")
        localStorage.removeItem("loginUsername")
        localStorage.removeItem("loginUseracno")
        this.toaster.showSuccess("Logout Successfully....Please Login for continue!!!","success")
        
        setTimeout(()=>{

          this.dashboardrouter.navigateByUrl("")
        },3000);

  }

  deleteAccount(){
    // api call
    this.api.deletedoctor(this.userid).subscribe({
      next:(response:any)=>{
        localStorage.removeItem("token")
        localStorage.removeItem("loginUsername")
        localStorage.removeItem("loginUseracno")
        
        this.toaster.showSuccess(response,"success")
        setTimeout(()=>{

          this.appointmentrouter.navigateByUrl("")
        },3000);
      },
      error:(err:any)=>{
        this.toaster.showError(err.message,"Error")
      }
    })
    
  }

}
