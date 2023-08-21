import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent  {
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
      this.isLogined =true

      this.api.login(number,password).subscribe({
        next:(result:any)=>{
          console.log(result);
          const {loginperson} = result
          localStorage.setItem("loginUsername",loginperson.username)
          localStorage.setItem("loginUserimage",loginperson.image)


         
          setTimeout(()=>{
            this.toaster.showSuccess(`Haii Admin!!!! `,"success")
            this.loginrouter.navigateByUrl("user/admin")       
  
  
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
