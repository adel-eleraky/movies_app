import { Component, inject } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieRequestsService } from '../services/movie-requests.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    imports: [MovieCardComponent, FormsModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    searchQuery: string = '';


    moviesData: any
    constructor(private MovieRequestsService: MovieRequestsService, private router: Router) { }

    ngOnInit() {
        this.MovieRequestsService.getMovies().subscribe(response => {
            console.log(response)
            this.moviesData = response.results
        })
    }

    searchMovies(): void {
        if (this.searchQuery.trim() !== '') {
            this.router.navigate(['/search'], {
                queryParams: { query: this.searchQuery },
            });
        }
    }

}
