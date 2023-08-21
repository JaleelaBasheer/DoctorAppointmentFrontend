import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
   constructor(private api:ApiService, private toaster:ToasterService, private dashboardrouter:Router,private fb:FormBuilder){}
  // form group/model
  acceptappointmentForm = this.fb.group({
    appointmentid: ['', [Validators.required,]],
     number: ['', [Validators.required]],
     udate: ['', [Validators.required]],
    utime: ['', [Validators.required]]
   })
   
  alldoctors:any=[]
  allpatients:any=[]
  allappointments:any=[]
  allacceptappointments:any=[]
  allrejectappointments:any=[]
  user:string=""
  image:string = ""
  appointmentusername:string=""
  appointmentnumber:string=""
  appointmentdate:string=""
  appointmenttime:string=""
  count:number=0
  doctorcount:number=0
  patientcount:number=0
  arrayhalf:number=0
  searchKey:string=""
  searchKeyy:string=""

 
  ngOnInit(): void {

    this.allappointmentdisplay()
    this.allacceptappointment()
    this.allrejectappointment()
    this.allcount()
    this.alldoctorcount()
    this.totalpatientcount()
    this.api.alldoctors().subscribe({
      next:(res:any)=>{
        this.alldoctors=res
      },
      error:(err:any)=>{
        this.toaster.showError(err,'Error')

      }
    })
    this.api.getallpatients().subscribe({
      next:(res:any)=>{
        this.allpatients=res
      },
      error:(err:any)=>{
        this.toaster.showError(err,'Error')

      }

    })
   
    this.user= localStorage.getItem("loginUsername")||""
   this.image= localStorage.getItem("loginUserimage")||""

  
  }
 

  allappointmentdisplay(){
    this.api.allappointments().subscribe({
      next:(result:any)=>{
         this.allappointments=result
        this.arrayhalf = result.length
       },
       error:(err:any)=>{
         this.toaster.showError(err,'Error')
  
       }
  
    })

  }
  allacceptappointment(){
    this.api.allacceptedappointments().subscribe({
      next:(result:any)=>{
         this.allacceptappointments=result
         
       },
       error:(err:any)=>{
         this.toaster.showError(err,'Error')
  
       }
  
    })
  }
  allrejectappointment(){
    this.api.allrejectedappointments().subscribe({
      next:(result:any)=>{
         this.allrejectappointments=result
         
       },
       error:(err:any)=>{
         this.toaster.showError(err,'Error')
  
       }
  
    })
  }
  
  buttonclickaccept(){
  
  let _id = this.acceptappointmentForm.value.appointmentid
  let number = this.acceptappointmentForm.value.number
  let appointmentdate = this.acceptappointmentForm.value.udate
  let appointmenttime = this.acceptappointmentForm.value.utime    
this.api.adminaccept(_id,number,appointmentdate,appointmenttime).subscribe({
  
  next:(result:any)=>{
    console.log(result);
    this.allcount()
    this.resetform()
    this.toaster.showSuccess("Appointment is successfully accepted","Message")
  },
  error:(err:any)=>{
    this.toaster.showError(err,'Error')

  }
})
  }
  buttonclickreject(){
  
    let _id = this.acceptappointmentForm.value.appointmentid
    let number = this.acceptappointmentForm.value.number
    let appointmentdate = this.acceptappointmentForm.value.udate
    let appointmenttime = this.acceptappointmentForm.value.utime  
      
  this.api.adminreject(_id,number,appointmentdate,appointmenttime).subscribe({
    
    next:(result:any)=>{
      console.log(result);
      this.allcount()
      this.resetform()     
        this.toaster.showSuccess("Appointment is rejected","Message")
  
  
      
    },
    error:(err:any)=>{
      this.toaster.showSuccess("Appointment is rejected","Message")
  
    }
  })
    }
   
 
  allcount(){
    this.api.appointmentcount.subscribe((res:any)=>{
      this.count=res
  
    })
  
  }
  alldoctorcount(){
    this.api.alldoctorcount.subscribe((res:any)=>{
      this.doctorcount=res
    })
  }
   totalpatientcount(){
    this.api.allpatientscount.subscribe((res:any)=>{
      this.patientcount=res
      console.log(this.patientcount);
      
    })
  }
  logout(){
        localStorage.removeItem("loginUsername")
        localStorage.removeItem("loginUserimage")
        this.toaster.showSuccess("Logout Successfully....Please Login for continue!!!","success")
        
        setTimeout(()=>{

          this.dashboardrouter.navigateByUrl("")
        },3000);

  }
  resetform(){
    this.acceptappointmentForm.reset()
  }
  
  



}
