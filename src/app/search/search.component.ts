import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { FormsModule } from '@angular/forms';
import { IMovie } from '../interfaces/imovie';
import { DatePipe } from '@angular/common';
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-search',
  imports: [ FormsModule, MovieCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  searchQuery: string = '';
  searchResults: IMovie[] = [];
  loading: boolean = false;
  error: string | null = null;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private movieSearchService: SearchService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['query']) {
        this.searchQuery = params['query'];
        this.currentPage = 1;
        this.searchMovies();
      }
    });
  }

  searchMovies(): void {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.loading = true;
    this.error = null;

    this.movieSearchService
      .searchMovies(this.searchQuery, this.currentPage)
      .subscribe({
        next: (data) => {
          this.searchResults = data.results;
          this.loading = false;
          this.totalPages = data.total_pages;
        },
        error: (error) => {
          this.error = 'Failed to fetch results.';
          console.error(error);
          this.loading = false;
        },
      });
  }

  updateSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchQuery },
    });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.searchMovies();
    }
  }
}