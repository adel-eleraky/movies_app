import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieRequestsService } from './movie-requests.service';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlist = new BehaviorSubject<any[]>(this.getWatchlistFromStorage());
  watchlist$ = this.watchlist.asObservable();

  private watchlistCount = new BehaviorSubject<number>(this.watchlist.value.length);
  watchlistCount$ = this.watchlistCount.asObservable();

  constructor(private movieRequestsService: MovieRequestsService) {
    this.watchlist.next(this.getWatchlistFromStorage());
    this.watchlistCount.next(this.watchlist.value.length);

    this.movieRequestsService.getLanguage().subscribe((lang) => {
      this.updateWatchlistLanguage(lang);
    });
  }

  private getWatchlistFromStorage(): any[] {
    const watchlistJson = localStorage.getItem('watchlist');
    return watchlistJson ? JSON.parse(watchlistJson) : [];
  }

  private saveWatchlistToStorage(watchlist: any[]): void {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  private updateWatchlistLanguage(lang: string): void {
    const currentList = this.watchlist.value;
    const updatedList = currentList.map((movie) => {
      this.movieRequestsService.getMovieDetails(movie.id, lang).subscribe((details: any) => {
        console.log('details',details)
        movie.title = details.title;
        movie.overview = details.overview;
      });
      return movie;
    });
    this.watchlist.next(updatedList);
  }

  addToWatchlist(movie: any) {
    const currentList = this.watchlist.value;
    if (!currentList.find((m) => m.id === movie.id)) {
      this.movieRequestsService.getLanguage().subscribe((lang) => {
        this.movieRequestsService.getMovieDetails(movie.id, lang).subscribe((details: any) => {
          movie.title = details.title;
          movie.overview = details.overview;
          const updatedList = [...currentList, movie];
          this.watchlist.next(updatedList);
          this.watchlistCount.next(updatedList.length);
          this.saveWatchlistToStorage(updatedList);
        });
      });
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
