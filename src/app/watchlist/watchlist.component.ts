import { Component } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { RatingStarsPipe } from '../pipes/rating-stars.pipe';

@Component({
  selector: 'app-watchlist',
  imports: [RatingStarsPipe],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  watchlist: any[] = [];

  constructor(private WatchlistService: WatchlistService) {}

  ngOnInit() {
    this.watchlist = this.WatchlistService.getWatchlist();
  }

  removeFromWishlist(itemId: number) {
    this.WatchlistService.removeFromWishlist(itemId);
    this.watchlist = this.WatchlistService.getWatchlist();
  }
}
