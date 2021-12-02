import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authorBook'
})
export class AuthorBookPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length > 20){

      value = value.slice(0,20);

      return value + "..."; 
    }
    return value;
  }

}
