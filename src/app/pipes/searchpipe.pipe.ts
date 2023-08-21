import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {

  transform(alldoctors:any[],searchTerm:string,property:string): any[] {
    const result:any=[]
    if(!alldoctors || searchTerm==="" || property===""){
      return alldoctors
    }
    alldoctors.forEach((item:any)=>{
      if(item[property].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
      ){
        result.push(item)
      }
    })
    return result;
  }
  


}
