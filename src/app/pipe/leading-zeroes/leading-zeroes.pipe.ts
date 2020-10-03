import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leadingZeroes'
})
export class LeadingZeroesPipe implements PipeTransform {

  transform(value: number, digits?: number): string {
    const formatted = String(value);
    if (digits && digits > formatted.length) {
      return formatted.padStart(digits, '0');
    }
    return formatted;
  }

}
