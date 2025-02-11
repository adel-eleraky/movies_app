import { Component, inject } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieRequestsService } from '../services/movie-requests.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
    selector: 'app-header',
    imports: [MovieCardComponent, FormsModule, PaginationComponent, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    searchQuery: string = '';


    constructor(private MovieRequestsService: MovieRequestsService, private router: Router) { }
    moviesData: any;
    lang: string = 'en';
    totalPages: number = 0;
    currentPage: number = 1;


    searchMovies(): void {
        if (this.searchQuery.trim() !== '') {
            this.router.navigate(['/search'], {
                queryParams: { query: this.searchQuery },
            });
        }
    }

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
