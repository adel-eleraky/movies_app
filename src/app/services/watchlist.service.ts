import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlist = new BehaviorSubject<any[]>([]);
  watchlist$ = this.watchlist.asObservable();

  private watchlistCount = new BehaviorSubject<number>(0);
  watchlistCount$ = this.watchlistCount.asObservable();

  addToWatchlist(movie: any){
    const currentList = this.watchlist.value;
    if (!currentList.find((m) => m.id === movie.id)) {
      const updatedList = [...currentList, movie];
      this.watchlist.next(updatedList);
      this.watchlistCount.next(updatedList.length);
    }
  }

  removeFromWatchlist(movieId: number) {
    const currentList = this.watchlist.value;
    const updatedList = currentList.filter((movie) => movie.id !== movieId);
    this.watchlist.next(updatedList);
    this.watchlistCount.next(updatedList.length);
  }

  isInWatchlist(movieId: number): boolean {
    return !!this.watchlist.value.find((movie) => movie.id === movieId);
  }
}
