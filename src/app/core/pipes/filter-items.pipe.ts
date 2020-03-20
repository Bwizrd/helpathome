import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterItems',
  pure: false
})
export class FilterItemsPipe implements PipeTransform {
  transform(items: any, searchTerm: string) {
    if (!items || !searchTerm) {
      return items;
    }
    return items.filter(item => item.postCode.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  }
}
