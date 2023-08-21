import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-doctorregister',
  templateUrl: './doctorregister.component.html',
  styleUrls: ['./doctorregister.component.css']
})
export class DoctorregisterComponent {
  constructor(private fb:FormBuilder,  private toaster:ToasterService, private api:ApiService, private registerRouter:Router){}

   // form group/model
   registerForm = this.fb.group({
    id:['',Validators.required],
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(2)]],
    number: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    email:['', Validators.required],
    image:['', Validators.required],
    department:['', Validators.required],
    specilization:['', Validators.required],
    education:['', Validators.required],
    experience:['', Validators.required],
    address:['', Validators.required],
    place:['', Validators.required],
    checkbox:['', Validators.required]

  })

  register(){
    if(this.registerForm.valid){
      let id = this.registerForm.value.id

      let username = this.registerForm.value.username

      let number = this.registerForm.value.number

      let password = this.registerForm.value.password

      let email = this.registerForm.value.email

      let image = this.registerForm.value.image

      let department = this.registerForm.value.department

      let specilization = this.registerForm.value.specilization

      let education = this.registerForm.value.education

      let experience =this.registerForm.value.experience

      let address = this.registerForm.value.address

      let place = this.registerForm.value.place

      let checkbox = this.registerForm.value.checkbox
      //  api call
       this.api.doctorregister(id,username,number,password,email,image,department,specilization,education,experience,address,place).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toaster.showSuccess(`${res.username} Registered successfully`,"success")
          // navigate to log in
          setTimeout(() => {
            this.registerRouter.navigateByUrl("/user/doctorlogin")
          }, 3000);

        },
        error:(err:any)=>{
          console.log(err.error);
          this.toaster.showError(`${err.error}`,"failed")
          setTimeout(() => {
            this.registerForm.reset()
          }, 3000);
          
        }
      })

    }
    else {
      this.toaster.showWarning("Invaild Form","Warning")
    }
  }
}
