import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isReadMore:boolean=true
  toggle(){
    this.isReadMore = !this.isReadMore
  }
 allreviews:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.allreview().subscribe({
      next:(result:any)=>{
         this.allreviews=result
         console.log(this.allreviews);
         
         
       },
       error:(err:any)=>{
        alert(err)
  
       }
  
    })

  }
 
}
