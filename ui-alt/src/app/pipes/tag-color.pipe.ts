import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagColor',
})
export class TagColorPipe implements PipeTransform {
  /**
   * <`hsl(${h}deg, 90%, 65%)`>
   * @param tagList {<KeyValue<string,string>> | string}
   * @return {<string>}
   */
  transform(tag: string | KeyValue<string, string>): unknown {
    const value = typeof tag === 'string' ? tag : tag.key;
    if (value !== '') {
      const h = Math.abs(
        `${value}}`
          .split('')
          .map((v) => v.charCodeAt(0))
          .reduce((a, v) => (a + ((a << 7) + (a << 3))) ^ v) % 360
      );
      return `hsl(${h}, 90%, 65%)`;
    }

    return 'transparent';
  }
}
