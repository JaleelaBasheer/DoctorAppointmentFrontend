import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(allacceptappointment:any[],searchTerm:string): any[] {
    const result:any=[]
    if(!allacceptappointment || searchTerm==="" ){
      return allacceptappointment;
    }
    return allacceptappointment.filter (item=>
      item.appointmenttime.toString().toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      item.appointmentdate.toString().toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      item.doctorname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())

      );
     
 
 
}
}