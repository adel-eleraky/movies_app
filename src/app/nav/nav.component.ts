import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WatchlistService } from '../services/watchlist.service';
import { MovieRequestsService } from '../services/movie-requests.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  watchlistCount = 0;

  constructor(private watchlistService: WatchlistService, private MovieRequestsService: MovieRequestsService) { }

  ngOnInit(): void {
    this.watchlistService.watchlistCount$.subscribe((count) => {
      this.watchlistCount = count;
    });
  }

  handleLang(lang: string) {

    this.MovieRequestsService.getMovies(lang);

    if (lang === 'ar') {
      document.getElementById("movie-list")!.setAttribute('dir', 'rtl');
    } else {
      document.getElementById("movie-list")!.setAttribute('dir', 'ltr');
    }
  }
}
