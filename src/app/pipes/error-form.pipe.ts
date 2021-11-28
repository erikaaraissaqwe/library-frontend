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
        return `O campo '${input}' é obrigatório`;
      case 'minlength':
        return `O campo '${input}' precisa de no mínimo ${error.minlength.requiredLength} caracteres`;
      case 'email':
        return `O campo '${input}' precisa ser um email válido`;
      default:
        return '';
    }
  }
}