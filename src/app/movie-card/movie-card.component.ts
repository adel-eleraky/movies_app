import { Component, Input, NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { VotePipe } from '../pipes/vote.pipe';
import { NgClass } from '@angular/common';
import { WatchlistService } from '../services/watchlist.service';
import { SlicePipe } from '@angular/common';
import { CircularProgressComponent } from '../circular-progress/circular-progress.component';

@Component({
  selector: 'app-movie-card',
  imports: [
    VotePipe,
    SlicePipe,
    CircularProgressComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movieData: any;

  constructor(
    private watchlistService: WatchlistService,
    private router: Router
  ) {}

  toggleWatchlist(movieData: any, event: MouseEvent) {
    event.stopPropagation();
    if (this.watchlistService.isInWatchlist(movieData.id)) {
      this.watchlistService.removeFromWatchlist(movieData.id);
    } else {
      this.watchlistService.addToWatchlist(movieData);
    }
  }

  isInWatchlist(): boolean {
    return this.watchlistService.isInWatchlist(this.movieData.id);
  }

  handleRedirectToDetails(id: any) {
    this.router.navigate(['/moive-details', id]);
  }
}
