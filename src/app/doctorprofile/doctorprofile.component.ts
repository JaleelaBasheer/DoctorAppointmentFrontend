import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
constructor(private api:ApiService, private toaster:ToasterService, private dashboardrouter:Router ){}

   alldoctors:any=[]
   searchKey:string=""
  ngOnInit(): void {

    

    this.api.alldoctors().subscribe({
      next:(res:any)=>{
        this.alldoctors=res
      },
      error:(err:any)=>{
        this.toaster.showError(err,'Error')

      }
    })

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

}
