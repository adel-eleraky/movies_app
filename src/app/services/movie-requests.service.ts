import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieRequestsService {

  private moviesSubject = new BehaviorSubject<any[]>([]);
  movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getMovies();
  }

  API_KEY: string = 'd6da8520522d81d3a36bfba09dfcbdc6';
  path = "http://image.tmdb.org/t/p/w500"


  //  https://api.themoviedb.org/3/movie/now_playing
  //  https://api.themoviedb.org/3/movie/${id}
  getMovies(lang: string = "en"): void {
    this.http.get(`https://api.themoviedb.org/3/movie/now_playing`, {
      params: {
        api_key: this.API_KEY,
        language: lang
      }
    }).subscribe((response: any) => {
      this.moviesSubject.next(response.results);
    });
  }

  getMovieDetails(id: string) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`)
  }





}
