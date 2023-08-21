import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder, private toaster:ToasterService, private api:ApiService, private loginrouter:Router){}

  // form group/model
  loginForm = this.fb.group({
   loginnumber: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10)]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
   
  })

    // form group/model
    forgotForm = this.fb.group({
      forgotnumber: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10)]],
      loginemail: ['', [Validators.required]]
      
     })
     pasword:boolean=false
  isLogined:boolean=false
  forgotpassword:boolean=false
  login(){
    if(this.loginForm.valid){

      let number = this.loginForm.value.loginnumber

      let password = this.loginForm.value.pswd
      this.isLogined=true

      this.api.login(number,password).subscribe({
        next:(result:any)=>{
          console.log(result);
          const {loginperson,token} = result
         
          //  store username in local storage
        localStorage.setItem("loginUserid",loginperson._id)
        localStorage.setItem("loginUsername",loginperson.username)
        localStorage.setItem("loginUsernumber",loginperson.number)
        localStorage.setItem("loginUserpassword",loginperson.password)
        localStorage.setItem("loginUserimage",loginperson.image)
        localStorage.setItem("loginUserbloodtype",loginperson.bloodgroup)
        localStorage.setItem("loginUserimage",loginperson.image)
        localStorage.setItem("loginUseremail",loginperson.email)
        localStorage.setItem("loginUseraddress",loginperson.address)
        localStorage.setItem("loginUserplace",loginperson.place)
        localStorage.setItem("loginUserbooking", JSON.stringify(loginperson.booking));
        localStorage.setItem("loginUserreview", JSON.stringify(loginperson.review));
        localStorage.setItem("loginUseraccepts", JSON.stringify(loginperson.accept));
        localStorage.setItem("loginUserrejects", JSON.stringify(loginperson.reject));
        localStorage.setItem("token",token)
          setTimeout(()=>{
            this.toaster.showSuccess(`${loginperson.username}..... welcome to Medicare `,"Message")
            this.loginrouter.navigateByUrl("user/userprofile")       
  
  
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
password:any=""
  forgot(){
    if(this.forgotForm.valid){

      let number = this.forgotForm.value.forgotnumber

      let email = this.forgotForm.value.loginemail
     this.api.forgotpassword(number,email).subscribe({
      next:(result:any)=>{
        this.forgotpassword=true;
        console.log(result);
        const {person,token} = result
        localStorage.setItem("loginforgotpassword",person.password)
        this.password=localStorage.getItem("loginforgotpassword")||""
        this.resetform()
      }
     })
    }
  }
  resetform(){
    this.forgotForm.reset()
  }

}

