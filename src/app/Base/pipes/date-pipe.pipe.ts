import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormatPipe',
})
export class dateFormatPipe implements PipeTransform {
    transform(value: string, format: string) {
        var datePipe = new DatePipe("en-US");
        var result = new Date(value);
        result.setDate(result.getDate() + 1 );
        var dateResult = datePipe.transform(result, format);
        return dateResult;
    }
}