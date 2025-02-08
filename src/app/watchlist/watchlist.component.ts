import { Component } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { RatingStarsPipe } from '../pipes/rating-stars.pipe';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  imports: [RatingStarsPipe, SlicePipe],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  watchlist: any[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {
    this.watchlistService.watchlist$.subscribe((movies) => {
      console.log(movies)
      this.watchlist = movies;
    });
  }

  removeFromWatchlist(movieId: number) {
    this.watchlistService.removeFromWatchlist(movieId);
  }
}

