import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  imports: [],
  templateUrl: './circular-progress.component.html',
  styleUrl: './circular-progress.component.css'
})
export class CircularProgressComponent {
  @Input() progress: number = 0;

  calculateProgress(): number {
    const circumference = 2 * Math.PI * 40;
    return circumference - (this.progress / 100) * circumference;
  }

  getProgressColor(): string {
    if(this.progress > 70) {
      return "stroke: #51e41cb0"
    } else {
      return "stroke: rgb(220 183 26 / 90%)"
    }
  }
}
