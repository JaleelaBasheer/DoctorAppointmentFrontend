import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctorlogin',
  templateUrl: './doctorlogin.component.html',
  styleUrls: ['./doctorlogin.component.css']
})
export class DoctorloginComponent {
  constructor(private fb:FormBuilder, private toaster:ToasterService, private api:ApiService, private loginrouter:Router){}

  // form group/model
  loginForm = this.fb.group({
   loginnumber: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10)]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  })
  isLogined:boolean=false


  login(){
    if(this.loginForm.valid){

      let number = this.loginForm.value.loginnumber

      let password = this.loginForm.value.pswd
     this.isLogined=true


      this.api.doctorlogin(number,password).subscribe({
        next:(result:any)=>{
          console.log(result);
          const {loginperson,token} = result
          //  store username in local storage
        localStorage.setItem("loginUser_id",loginperson._id)
        localStorage.setItem("loginUserid",loginperson.id)
        localStorage.setItem("loginUsername",loginperson.username)
        localStorage.setItem("loginUserpassword",loginperson.password)
        localStorage.setItem("loginUsernumber",loginperson.number)
        localStorage.setItem("loginUserimage",loginperson.image)
        localStorage.setItem("loginUseremail",loginperson.email)
        localStorage.setItem("loginUserspecilization",loginperson.specilization)
        localStorage.setItem("loginUserdepartment",loginperson.department)
        localStorage.setItem("loginUsereducation",loginperson.education)
        localStorage.setItem("loginUserexperience",loginperson.experience)
        localStorage.setItem("loginUseraddress",loginperson.address)
        localStorage.setItem("loginUserplace",loginperson.place)
        localStorage.setItem("token",token)
          setTimeout(()=>{
            this.toaster.showSuccess(`Welcome `,"success")
            this.loginrouter.navigateByUrl("user/doctorindividualprofile")       
  
  
           },3000)
          
        },
        error:(result:any)=>{
          console.log(result.error);
          this.toaster.showError(result.error,"Error")
          setTimeout(() => {
            this.loginForm.reset()
          }, 3000);
          
        }
       })
      
      
    
    }
    else {
      this.toaster.showWarning("Invaild Form","Warning")
    }
  }

}
