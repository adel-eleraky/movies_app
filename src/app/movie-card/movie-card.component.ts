import { Component, Input, NgModule } from '@angular/core';
import { VotePipe } from '../pipe/vote.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [VotePipe ,NgClass],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

    @Input() movieData: any
}
