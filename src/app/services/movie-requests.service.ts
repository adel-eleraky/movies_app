import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieRequestsService {
  private moviesSubject = new BehaviorSubject<any>([]);
  // movies$ = this.moviesSubject.asObservable();
  private currentPage = new BehaviorSubject<number>(1);
  private language = new BehaviorSubject<string>('en');

  constructor(private http: HttpClient) {
    // return this.getMovies();
  }

  API_KEY: string = environment.apiKey;
  path = 'http://image.tmdb.org/t/p/w500';

  //  https://api.themoviedb.org/3/movie/now_playing
  //  https://api.themoviedb.org/3/movie/${id}
  getMovies(lang: string = "en", page: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/now_playing`,
      {
        params: {
          api_key: this.API_KEY,
          page: page.toString(),
          language: lang,
        },
      }
    );
    // .subscribe((response: any) => {
    //   this.moviesSubject.next(response);
    // });
  }

  getMovieDetails(id: string) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`);
  }
  getCurrentPage() {
    return this.currentPage.asObservable();
  }
  setCurrentPage(page: number) {
    this.currentPage.next(page);
  }
  getLanguage() {
    return this.language.asObservable();
  }
  setLanguage(lang: string) {
    this.language.next(lang);
  }
}
