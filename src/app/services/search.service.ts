import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/imovie';
import { environment } from '../../environments/environment'; // See note below!

interface SearchResponse {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiKey = environment.apiKey; // Store your API key in an environment file!
  private baseUrl = 'https://api.themoviedb.org/3';
  // private apiKey = "4c7277e7f1314aaf1afdc60c38f8fd22";
  private http = inject(HttpClient);

  searchMovies(query: string, page: number = 1): Observable<SearchResponse> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`;
    return this.http.get<SearchResponse>(url);
  }

}