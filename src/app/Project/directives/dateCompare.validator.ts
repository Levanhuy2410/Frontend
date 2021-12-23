import { AbstractControl, FormGroup, NG_VALIDATORS, Validators } from '@angular/forms';
import { Directive, Input, Host } from '@angular/core';
import { Calendar } from 'primeng/calendar';
// @Directive({ 
//     selector: '[isLessThanStartDate]',
//     providers: [{provide: NG_VALIDATORS, useExisting: 'EndDateValidatorDirective', multi: true}] 
// })
// export class EndDateValidatorDirective implements Validators {
    

//     @Input('isLessThanStartDate') shouldbeless:string;
//     validate(control: AbstractControl): {[key: string] : any}| null{
//         const sDate = new Date(this.shouldbeless);
//         const eDate = new Date(control.value);

//         return (sDate > eDate) ? {'StartDateIsMore' : true}:null;
//     }

//     locale = {
//         firstDayOfWeek: 0,
//         dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
//         dayNamesShort: ['ראש\'', 'שני', 'שלי\'', 'רבי\'', 'חמי\'', 'שיש\'', 'שבת'],
//         dayNamesMin: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'ש\''],
//         monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
//         monthNamesShort: ['ינו\'', 'פבר\'', 'מרץ', 'אפר\'', 'מאי', 'יוני', 'יולי', 'אוג\'', 'ספט\'', 'אוק\'', 'נוב\'', 'דצמ\''],
//         today: 'היום',
//         clear: 'נקה'
//       };
    
//       // This way, injecting the component by @Host, is a workaround, this is an open issue in angular: https://github.com/angular/angular/issues/13776
//       constructor(@Host() private pCalendar: Calendar) {
//         pCalendar.locale = this.locale;
//       }
// }
export function ValidateDate(control: AbstractControl): { [key: string]: any } | null {
    const startDate = new Date(control.get('startDate').value);
    if (control.get('endDate').value === null) {
        return null
    }
    else {
        const endDate = new Date(control.get('endDate').value);
        return (startDate > endDate) ? { 'StartDateIsMore': true } : null;
    }
}


