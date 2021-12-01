import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs/operators';

@Pipe({
  name: 'titleBook'
})
export class TitleBookPipe implements PipeTransform {

  transform(value: string): string {

    if(value.length > 20){
      value = value.slice(0,20);
      return value+ "..."; 
    }
    return value;
  }

}
