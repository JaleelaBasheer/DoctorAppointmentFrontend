import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituserprofile',
  templateUrl: './edituserprofile.component.html',
  styleUrls: ['./edituserprofile.component.css']
})
export class EdituserprofileComponent implements OnInit {

  constructor(private api:ApiService,private fb:FormBuilder, private toaster:ToasterService, private editrouter:Router){}
 
  userid:string=""
  user:string=""
  number:any=""
  password:any=""
  bloodgroup:any=''
  image:string=""
  email:any=""
  address:any=""
  place:any=""
  userdetails:any=[]


  // form group/model
  editForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(2)]],
   number: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    email:['', Validators.required],
    bloodgroup:['', Validators.required],
    image:['', Validators.required],
    address:['', Validators.required],
    place:['', Validators.required],
    checkbox:['', Validators.required]
    

  })
  ngOnInit(): void {
   this.userid= localStorage.getItem("loginUserid")||""
   this.user= localStorage.getItem("loginUsername")||""
   this.number= localStorage.getItem("loginUsernumber")||""
   this.password= localStorage.getItem("loginUserpassword")||""
   this.image= localStorage.getItem("loginUserimage")||""
   this.bloodgroup= localStorage.getItem("loginUserbloodtype")||""
   this.email= localStorage.getItem("loginUseremail")||""
   this.address= localStorage.getItem("loginUseraddress")||""
   this.place= localStorage.getItem("loginUserplace")||""
   this.onedit()

  }

  onedit(){
    this.editForm.controls['username'].setValue(this.user)
    this.editForm.controls['number'].setValue(this.number)
    this.editForm.controls['password'].setValue(this.password)
    this.editForm.controls['email'].setValue(this.email)
    this.editForm.controls['bloodgroup'].setValue(this.bloodgroup)
    this.editForm.controls['image'].setValue(this.image)
    this.editForm.controls['address'].setValue(this.address)
    this.editForm.controls['place'].setValue(this.place)


  }
  Update(){
    this.api.edituser(this.userid,this.editForm.value.username,this.editForm.value.number,this.editForm.value.password,this.editForm.value.email,this.editForm.value.bloodgroup,this.editForm.value.image,this.editForm.value.address,this.editForm.value.place).subscribe({
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
