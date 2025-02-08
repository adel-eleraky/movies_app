import { Component } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieRequestsService } from '../services/movie-requests.service';

@Component({
    selector: 'app-header',
    imports: [MovieCardComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

    moviesData: any
    constructor(private MovieRequestsService: MovieRequestsService) {}

    ngOnInit() {
        this.MovieRequestsService.getMovies().subscribe(response => {
            console.log(response)
            this.moviesData = response.results
        })
    }
}
