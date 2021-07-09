import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterator'
})
export class DoublePipe implements PipeTransform {

  transform(value: number, exponent:number): number {
    return Math.pow(value, exponent)
  }

}
