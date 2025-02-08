import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'vote'
})
export class VotePipe implements PipeTransform {

    transform(value: number): number {
        return Math.floor(value)
    }

}
