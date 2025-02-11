import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WatchlistService } from '../services/watchlist.service';
import { MovieRequestsService } from '../services/movie-requests.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  watchlistCount = 0;
  // toDo
  currentPage: number = 1;
  lang: string = 'en';
  moviesData: any;
  constructor(
    private watchlistService: WatchlistService,
    private MovieRequestsService: MovieRequestsService
  ) {}

  ngOnInit(): void {
    this.watchlistService.watchlistCount$.subscribe((count) => {
      this.watchlistCount = count;
    });
    this.MovieRequestsService.getCurrentPage().subscribe((page) => {
      this.currentPage = page;
    });
    this.MovieRequestsService.getLanguage().subscribe((language) => {
      this.lang = language;
    });
  }

  handleLang(lang: string) {
    this.MovieRequestsService.setLanguage(lang);
    this.MovieRequestsService.getMovies(lang, this.currentPage).subscribe(
      (movies) => {
        this.moviesData = movies.results;
        console.log(movies);
      }
    );

    if (lang === 'ar') {
      document.getElementById('movie-list')!.setAttribute('dir', 'rtl');
      document.getElementById('movie-details-card')!.setAttribute('dir', 'rtl');
      document.getElementById('recommend-list')!.setAttribute('dir', 'rtl');
    } else {
      document.getElementById('movie-list')!.setAttribute('dir', 'ltr');
      document.getElementById('movie-details-card')!.setAttribute('dir', 'ltr');
      document.getElementById('recommend-list')!.setAttribute('dir', 'ltr');
    }
  }
}
