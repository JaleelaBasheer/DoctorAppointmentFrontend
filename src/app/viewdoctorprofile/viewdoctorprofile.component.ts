import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewdoctorprofile',
  templateUrl: './viewdoctorprofile.component.html',
  styleUrls: ['./viewdoctorprofile.component.css']
})
export class ViewdoctorprofileComponent implements OnInit {
  constructor(private viewActivatedroute:ActivatedRoute, private api:ApiService, private toaster:ToasterService, private appointmentrouter:Router, private fb:FormBuilder){}

  aboutfeedback:boolean=true
  submitfeedback:boolean=false

  appointmentForm = this.fb.group({
    udate: ['', [Validators.required,]],
     utime: ['', [Validators.required]],
     doctorname: ['', [Validators.required]],
    description: ['', [Validators.required]]
   })
  
   user:string=""
   number:string=""
   image:string=""
   doctorid:string=""
 doctors:any=[]
 doctrreview:any=[]
  ngOnInit(): void {
    this.viewz()
    
 
  }
  viewz(){
    this.user= localStorage.getItem("loginUsername")||""
    this.number= localStorage.getItem("loginUsernumber")||""
    this.image= localStorage.getItem("loginUserimage")||""

    this.viewActivatedroute.params.subscribe((res:any)=>{
      console.log(res);
      const {id} = res;
      this.doctorid=res
      console.log(id);
    
      this.api.viewdoctorprofile(id).subscribe({
        next:(result:any)=>{
          console.log(result);
          this.doctors=result

        },
        error:(err:any)=>{
          console.log(err.message);
        }
      })     
    
  })
 
  }
  
//  // review
//  reviewdoctor(){
  
//   let username= this.user
//   let number = this.number
//   let image= this.image
//   let udescription = this.appointmentForm.value.description
//   this.api.reviewdoctor(this.doctorid,username,number,image,udescription).subscribe({
//     next:(res:any)=>{
//       console.log(res);
//       this.doctrreview=res
//         this.toaster.showSuccess(`Thanks For your Feedback!!!`,"Message")
        
//         this.resetform()
//     },
//     error:(err:any)=>{
//       console.log(err.error);
//         this.toaster.showError(`${err.error}`,"failed")
//          }

//   })
// }

resetform(){
  this.appointmentForm.reset()
}

  // log out

  logout(){
    localStorage.removeItem("token")
        localStorage.removeItem("loginUsername")
        localStorage.removeItem("loginUseracno")
        this.toaster.showSuccess("Logout Successfully....Please Login for continue!!!","Message")
        
        setTimeout(()=>{

          this.appointmentrouter.navigateByUrl("")
        },3000);

  }

 

  }


  

