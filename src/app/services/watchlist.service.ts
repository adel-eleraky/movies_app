import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlist = new BehaviorSubject<any[]>(this.getWatchlistFromStorage());
  watchlist$ = this.watchlist.asObservable();

  private watchlistCount = new BehaviorSubject<number>(this.watchlist.value.length);
  watchlistCount$ = this.watchlistCount.asObservable();

  constructor() {
    this.watchlist.next(this.getWatchlistFromStorage());
    this.watchlistCount.next(this.watchlist.value.length);
  }

  private getWatchlistFromStorage(): any[] {
    const watchlistJson = localStorage.getItem('watchlist');
    return watchlistJson ? JSON.parse(watchlistJson) : [];
  }

  private saveWatchlistToStorage(watchlist: any[]): void {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  addToWatchlist(movie: any) {
    const currentList = this.watchlist.value;
    if (!currentList.find((m) => m.id === movie.id)) {
      const updatedList = [...currentList, movie];
      this.watchlist.next(updatedList);
      this.watchlistCount.next(updatedList.length);
      this.saveWatchlistToStorage(updatedList);
    }
  }

  removeFromWatchlist(movieId: number) {
    const currentList = this.watchlist.value;
    const updatedList = currentList.filter((movie) => movie.id !== movieId);
    this.watchlist.next(updatedList);
    this.watchlistCount.next(updatedList.length);
    this.saveWatchlistToStorage(updatedList);
  }

  isInWatchlist(movieId: number): boolean {
    return !!this.watchlist.value.find((movie) => movie.id === movieId);
  }
}
