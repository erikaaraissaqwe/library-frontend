import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs/operators';

@Pipe({
  name: 'titleBook'
})
export class TitleBookPipe implements PipeTransform {

  transform(value: string): string {
    console.log(value)
    console.log(value.length)
    if(value.length > 16){

      value = value.slice(0,16);

      return value + "..."; 
    }
    return value;
  }

}
