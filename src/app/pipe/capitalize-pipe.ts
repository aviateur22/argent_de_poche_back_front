import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {

  transform(textToCapitalize: string): string {
      if (!textToCapitalize) return '';

    return textToCapitalize.charAt(0).toUpperCase() + textToCapitalize.slice(1);
  }

}
