import { AbstractControl, FormGroup } from '@angular/forms';

export function ValidateDate(group: FormGroup): { [key: string]: any } | null {
    const startDate = new Date(group.controls.startDate.value);
    const endDate = new Date(group.controls.endDate.value);
    return (startDate > endDate) ? { 'StartDateIsMore' : true } : null;
}


