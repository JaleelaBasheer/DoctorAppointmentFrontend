import { Component, OnInit  } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  constructor(private toaster:ToasterService,private dashboardrouter:Router,private fb:FormBuilder, private appointmentrouter:Router, private api:ApiService){}
  // form group/model

  appointmentForm = this.fb.group({
    udate: ['', [Validators.required,]],
     utime: ['', [Validators.required]],
     doctorname: ['', [Validators.required]],
    description: ['', [Validators.required]]
   })
  userid:string=""
  user:string=""
  password:any=""
  address:any="" 
  place:any="" 
  image:string = ""
  bloodtype:string=""
  email:string=""
  number:string=""
  booking:any = []
  review:any=[]
  acceptappointment:any=[]
  rejectappointment:any=[]
  patientappointment:any=[]
  showstatus:string=""
  submitfeedback:boolean=false
  userreview:any=[]


  ngOnInit(): void {
   
   this.userid= localStorage.getItem("loginUserid")||""
   this.user= localStorage.getItem("loginUsername")||""
   this.password= localStorage.getItem("loginUserpassword")||""
   this.image= localStorage.getItem("loginUserimage")||""
   this.bloodtype= localStorage.getItem("loginUserbloodtype")||""
   this.email= localStorage.getItem("loginUseremail")||""
   this.number= localStorage.getItem("loginUsernumber")||""
   this.address= localStorage.getItem("loginUseraddress")||""
   this.place= localStorage.getItem("loginUserplace")||""
   this.booking= JSON.parse(localStorage.getItem("loginUserbooking") || "[]");
   this.review= JSON.parse(localStorage.getItem("loginUserreview") || "[]");
   this.acceptappointment=JSON.parse(localStorage.getItem("loginUseraccepts") || "[]");
   this.rejectappointment=JSON.parse(localStorage.getItem("loginUserrejects") || "[]");
   
  }
  getappointment(){
       
    let username= this.user
    let number = this.number
    let doctorname = this.appointmentForm.value.doctorname
    let udate=this.appointmentForm.value.udate
    let utime=this.appointmentForm.value.utime
    this.api.appointment(username,number,doctorname,udate,utime).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.patientappointment=res
          this.toaster.showSuccess(`${username} appointment is received...Please waiting for confirmation`,"Message")
          // navigate to log in
          this.resetform()
      },
      error:(err:any)=>{
        console.log(err.error);
          this.toaster.showError(`${err.error}`,"failed")
          setTimeout(() => {
            this.appointmentForm.reset()
          }, 3000);
          
      }
     
    })

  
  }

  // review
  reviewuser(){
    let username= this.user
    let number = this.number
    let image= this.image
    let udescription = this.appointmentForm.value.description
    this.api.review(username,number,image,udescription).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.userreview=res
          this.toaster.showSuccess(`Thanks For your Feedback!!!`,"Message")
          
          this.resetform()
      },
      error:(err:any)=>{
        console.log(err.error);
          this.toaster.showError(`${err.error}`,"failed")
           }

    })
  }
  
  
  resetform(){
    this.appointmentForm.reset()
  }

   deleteAccount(){
    // api call
    this.api.deleteuser(this.userid).subscribe({
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
  // log out

  logout(){
    localStorage.removeItem("token")
        localStorage.removeItem("loginUsername")
        localStorage.removeItem("loginUseracno")
        this.toaster.showSuccess("Logout Successfully....Please Login for continue!!!","success")
        
        setTimeout(()=>{

          this.dashboardrouter.navigateByUrl("")
        },3000);

  }
  

}

