import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editdoctorprofile',
  templateUrl: './editdoctorprofile.component.html',
  styleUrls: ['./editdoctorprofile.component.css']
})
export class EditdoctorprofileComponent implements OnInit {

  constructor(private api:ApiService, private toaster:ToasterService, private editrouter:Router, private fb:FormBuilder){}
  id:string=""
  user_id:string=""
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

  // form group/model
  editForm = this.fb.group({
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

  ngOnInit(): void {
    this.id =localStorage.getItem("loginUserid")||""
    this.user_id= localStorage.getItem("loginUser_id")||""
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
    this.onedit()
  }
  
  onedit(){
    this.editForm.controls['id'].setValue(this.id)
    this.editForm.controls['username'].setValue(this.user)
    this.editForm.controls['number'].setValue(this.number)
    this.editForm.controls['password'].setValue(this.password)
    this.editForm.controls['email'].setValue(this.email)
    this.editForm.controls['image'].setValue(this.image)
    this.editForm.controls['department'].setValue(this.department)
    this.editForm.controls['specilization'].setValue(this.specilization)
    this.editForm.controls['education'].setValue(this.education)
    this.editForm.controls['experience'].setValue(this.experience)
    this.editForm.controls['address'].setValue(this.address)
    this.editForm.controls['place'].setValue(this.place)
  }
 
   Update(){
     this.api.editdoctor(this.user_id,this.editForm.value.username,this.editForm.value.number,this.editForm.value.password,this.editForm.value.email,this.editForm.value.image,this.editForm.value.department,this.editForm.value.specilization,this.editForm.value.education,this.editForm.value.experience,this.editForm.value.address,this.editForm.value.place).subscribe({
       next:(res:any)=>{
         console.log(res);
         this.toaster.showSuccess("Successfully updated your data....Please login again","Message")
         setTimeout(()=>{
           this.editrouter.navigateByUrl("")               
 
         },3000)
       },
       error:(err:any)=>{
         console.log(err);
         this.toaster.showError(err,"Error")
         
       }
     })
   }

}
