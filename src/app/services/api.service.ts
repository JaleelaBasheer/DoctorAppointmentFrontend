import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  appointmentcount= new BehaviorSubject(0)
  alldoctorcount = new BehaviorSubject(0)
  reviewcount = new BehaviorSubject(0)
  allpatientscount=new BehaviorSubject(0)

  base_url:string = "http://localhost:3000"

  constructor(private http:HttpClient) {
    this.getappointmentcount()
    this.getdoctorcount()
    this.getallpatientscount()
   }

   // register
register(username:any,number:any,password:any,email:any,bloodgroup:any,image:any,address:any,place:any){

  const body = {username,number,password,email,bloodgroup,image,address,place}
  // api call to http://localhost:3000/register

  return this.http.post(`${this.base_url}/register`,body)
}
   // doctor register
   doctorregister(id:any,username:any,number:any,password:any,email:any,image:any,department:any,specilization:any,education:any,experience:any,address:any,place:any){

    const body = {id,username,number,password,email,image,department,specilization,education,experience,address,place}
    // api call to http://localhost:3000/register
  
    return this.http.post(`${this.base_url}/doctorregister`,body)
  }

// login
login(number:any,password:any){
  const body = {number,password}
  // api call to http://localhost:3000/register

  return this.http.post(`${this.base_url}/login`,body)

}

// append token
appendtoken(){
  // get token from local storage
  const token = localStorage.getItem("token")
  // create http request header
   let headers = new HttpHeaders()
   if (token){
    headers=headers.append("access-token",token)
   }
   return {headers}

}
// doctor login
doctorlogin(number:any,password:any){
  const body = {number,password}
  // api call to http://localhost:3000/register

  return this.http.post(`${this.base_url}/doctorlogin`,body)

}

// get all doctors
alldoctors(){
  // api call to http://localhost:3000/register

  return this.http.get(`${this.base_url}/viewalldoctors`)

}


// view doctor profile
viewdoctorprofile(id:any){
  // api call to http://localhost:3000/register

  return this.http.get(`${this.base_url}/viewdoctorprofile/${id}`)

}

// appointments

appointment(username:any,number:any,doctorname:any,appointmentdate:any,appointmenttime:any){
  const body ={username,number,doctorname,appointmentdate,appointmenttime}

  return this.http.post(`${this.base_url}/patientappointment`,body)

}

// all appointments
allappointments(){
  return this.http.get(`${this.base_url}/allappointments`)

 }
// get all patients
getallpatients(){
  // api call to http://localhost:3000/register

  return this.http.get(`${this.base_url}/viewallpatients`)

}

// admin accept
adminaccept(_id:any,number:any,appointmentdate:any,appointmenttime:any){
  const body= {_id,number,appointmentdate,appointmenttime}
  // api call
  return this.http.post(`${this.base_url}/acceptappointment`,body)
  
  }

  // admin reject
adminreject(_id:any,number:any,appointmentdate:any,appointmenttime:any){
  const body= {_id,number,appointmentdate,appointmenttime}
  // api call
  return this.http.post(`${this.base_url}/rejectappointment`,body)
  
  }
  // all accepted appointments
allacceptedappointments(){
  return this.http.get(`${this.base_url}/allacceptedappointment`)

 }

  // all accepted appointments
allrejectedappointments(){
  return this.http.get(`${this.base_url}/allrejectedappointment`)

 }
 // review

review(username:any,number:any,image:any,description:any){
  const body ={username,number,image,description}
  return this.http.post(`${this.base_url}/reviewdoctor`,body)
}


// allreview

allreview(){
  return this.http.get(`${this.base_url}/allreview`)
}

// Edituser

edituser(_id:any,username:any,number:any,password:any,bloodgroup:any,email:any,image:any,address:any,place:any){

  const body = {_id,username,number,password,email,bloodgroup,image,address,place}
  // api call to http://localhost:3000/register

  return this.http.patch(`${this.base_url}/edituser/${_id}`,body)
}

editdoctor(_id:any,username:any,number:any,password:any,email:any,image:any,department:any,specilization:any,education:any,experience:any,address:any,place:any){

  const body = {_id,username,number,password,email,image,department,specilization,education,experience,address,place}
  // api call to http://localhost:3000/register

  return this.http.patch(`${this.base_url}/editdoctor/${_id}`,body)
}

// delete account
deleteuser(_id:any){
  // api call
return this.http.delete(`${this.base_url}/delete-my-account/${_id}`)

}
// delete account
deletedoctor(_id:any){
  // api call
return this.http.delete(`${this.base_url}/delete-my-account/${_id}`)

}
// forgot password
forgotpassword(number:any,email:any){
  const body= {number,email}
  // api call
  return this.http.post(`${this.base_url}/forgotpassword`,body)
}

 getallpatientscount(){
  this.getallpatients().subscribe((result:any)=>{
    this.allpatientscount.next(result.length)
  })
 }
 
 getappointmentcount(){
  this.allappointments().subscribe((result:any)=>{
  this.appointmentcount.next(result.length)
  })
}
 getdoctorcount(){
  this.alldoctors().subscribe((result:any)=>{
  this.alldoctorcount.next(result.length)
  })
}





}
