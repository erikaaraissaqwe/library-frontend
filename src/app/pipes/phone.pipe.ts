import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(valor: string): string {
    console.log(valor)
    const regex = /^[0-9]+$/;
    if(regex.test(valor)){
      if(valor.length >= 8){
        if (valor.length == 8) {
          return valor.replace(/^(\d{4})(\d{4})/, '$1-$2');
        } else if (valor.length == 9) {
          return valor.replace(/^(\d{1})?(\d{4})?(\d{4})/, '$1 $2-$3');
        } else if (valor.length == 10) {
          return valor.replace(/^(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');
        } else if (valor.length == 11) {
          return valor.replace(/^(\d{2})?(\d{1})?(\d{4})?(\d{4})/, '($1) $2 $3-$4');
        }  else if (valor.length == 12) {
          return valor.replace(/^(\d{2})?(\d{2})?(\d{4})?(\d{4})/, '+$1 ($2) $3-$4');
        } else if (valor.length == 13) {
          return valor.replace(/^(\d{2})?(\d{2})?(\d{1})?(\d{4})?(\d{4})/, '+$1 ($2) $3 $4-$5');
        } else{
          return "Inválido";
        } 
      }
    }
    return "Inválido"
  }
}