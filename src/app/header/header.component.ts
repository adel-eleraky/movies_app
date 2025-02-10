import { Component } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieRequestsService } from '../services/movie-requests.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-header',
  imports: [MovieCardComponent, PaginationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  moviesData: any;
  lang: string = 'en';
  totalPages: number = 0;
  currentPage: number = 1;
  constructor(private MovieRequestsService: MovieRequestsService) {}

  ngOnInit() {
    // this.MovieRequestsService.movies$.subscribe((movies) => {
    //   this.moviesData = movies.results;
    //   console.log(movies);
    //   this.totalPages = movies.total_pages;
    // });
    this.MovieRequestsService.getLanguage().subscribe((language) => {
      this.lang = language;
      this.fetchMovies();
    });
    this.MovieRequestsService.getCurrentPage().subscribe((page) => {
      this.currentPage = page;

      this.fetchMovies();
    });
    // this.fetchMovies();
  }
  getCurrentPage(page: number) {
    this.currentPage = page;
    console.log(this.currentPage);
    this.MovieRequestsService.setCurrentPage(page);
    this.fetchMovies();
  }
  fetchMovies() {
    this.MovieRequestsService.getMovies(this.lang, this.currentPage).subscribe(
      (movies) => {
        this.moviesData = movies.results;
        console.log(movies);
        this.totalPages = movies.total_pages;
      }
    );
  }
}
