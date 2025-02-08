import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist: any[] = [];

  constructor() {}

  getWatchlist() {
    return this.watchlist;
  }

  addToWishlist(item: any) {
    if (!this.watchlist.some((movie) => movie.id === item.id)) {
      this.watchlist.push(item);
    }
  }

  removeFromWishlist(itemId: number) {
    this.watchlist = this.watchlist.filter((movie) => movie.id !== itemId);
  }
}
