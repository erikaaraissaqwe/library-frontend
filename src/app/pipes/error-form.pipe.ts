import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorForm'
})
export class ErrorFormPipe implements PipeTransform {

  transform(error: any, input: string): string {
    if(!error) {
      return '';
    }
    switch(Object.keys(error)[0]) {
      case 'required':
        return `${input} é obrigatório.`;
      case 'minlength':
        return `${input} precisa de no mínimo ${error.minlength.requiredLength} caracteres.`;
      case 'maxlength':
        return `${input} precisa ter até ${error.maxlength.requiredLength} caracteres.`;
      case 'email':
        return `${input} precisa ser válido.`;
        case 'pattern':
        return `${input} precisa ser um ${input} válido. Por favor, digite novamente.`;
      default:
        return '';
    }
  }
}