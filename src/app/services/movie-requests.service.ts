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

  constructor(private http: HttpClient) {}

  API_KEY: string = environment.apiKey;
  path = 'http://image.tmdb.org/t/p/w500';

  //  https://api.themoviedb.org/3/movie/now_playing
  //  https://api.themoviedb.org/3/movie/${id}
  getMovies(lang: string = 'en', page: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${16}`,
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
  //  https://api.themoviedb.org/3/movie/now_playing
  //  https://api.themoviedb.org/3/movie/${id}

  getMovieDetails(id: any, lang: string = 'en') {
    console.log('Fetching from API:', id);
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: this.API_KEY,
        language: lang,
      },
    });
  }
  // https://api.themoviedb.org/3/movie/{movie_id}/recommendations
  getRecommendations(id: any, lang: string = 'en') {
    console.log('Fetching from API:', id);
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations`,
      {
        params: {
          api_key: this.API_KEY,
          language: lang,
        },
      }
    );
  }

  // https://api.themoviedb.org/3/movie/${id}/credits

  getCredits(id: any, lang: string = 'en') {
    return this.http.get(`  https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: {
        api_key: this.API_KEY,
        language: lang,
      },
    });
  }

  getMovieVideos(movieId: any): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        params: {
          api_key: this.API_KEY,
        },
      }
    );
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
