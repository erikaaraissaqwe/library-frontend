import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let valueArray = value?.split("-");
    if(valueArray && valueArray.length === 3){
      value = valueArray[2] + "/" + valueArray[1] + "/" + valueArray[0];
      return value; 
    }
    return value;
  }
}
