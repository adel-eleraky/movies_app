import { Component, Input, NgModule } from '@angular/core';
import { VotePipe } from '../pipes/vote.pipe';
import { NgClass } from '@angular/common';
import { WatchlistService } from '../services/watchlist.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [VotePipe ,NgClass, SlicePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

    @Input() movieData: any

    constructor(private watchlistService: WatchlistService) {}

    toggleWatchlist(movieData: any) {
      if (this.watchlistService.isInWatchlist(movieData.id)) {
        this.watchlistService.removeFromWatchlist(movieData.id);
      } else {
        this.watchlistService.addToWatchlist(movieData);
      }
    }

    isInWatchlist(): boolean {
      return this.watchlistService.isInWatchlist(this.movieData.id);
    }
}
