import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MovieRequestsService {

    constructor(private http: HttpClient) { }

    API_KEY: string = 'd6da8520522d81d3a36bfba09dfcbdc6';
    path = "http://image.tmdb.org/t/p/w500"


    //  https://api.themoviedb.org/3/movie/now_playing
    //  https://api.themoviedb.org/3/movie/${id}
    getMovies(): Observable<any> {
        return this.http.get(`https://api.themoviedb.org/3/movie/now_playing`, {
            params: {
                api_key: this.API_KEY

            }
        })
    }

    getMovieDetails(id: string) {
        return this.http.get(`https://api.themoviedb.org/3/movie/${id}`)
    }





}
