import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    if (value === "NEW"){
      return "New";
    }
    else if (value === "INP"){
      return "InProgress";
    }
    else if (value === "PLA"){
      return "Planned";
    }
    else {
      return "Finished"
    }
  }

}
