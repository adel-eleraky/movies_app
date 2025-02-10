import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieRequestsService {

  constructor(private http: HttpClient) { }

   API_KEY:string='d6da8520522d81d3a36bfba09dfcbdc6';
   path ="http://image.tmdb.org/t/p/w500"

  //    https://api.themoviedb.org/3/movie/539972now_playing?api_key=d6da8520522d81d3a36bfba09dfcbdc6
  //  https://api.themoviedb.org/3/movie/539972?api_key=d6da8520522d81d3a36bfba09dfcbdc6

  //  https://api.themoviedb.org/3/movie/now_playing
  //  https://api.themoviedb.org/3/movie/${id}
  getMovies():Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing`,{
      params: {
        api_key: this.API_KEY
       
      }
    })
  }

  getMovieDetails(id: any) {
    console.log("Fetching from API:", id);
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`,{
        params: {
            api_key: this.API_KEY
         
        }
      })
  }
  // https://api.themoviedb.org/3/movie/{movie_id}/recommendations
  getRecommendations(id: any) {
    console.log("Fetching from API:", id);
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`,{
        params: {
            api_key: this.API_KEY
         
        }
      })
  }

  // https://api.themoviedb.org/3/movie/${id}/credits

  getCredits(id: any) {
    return this.http.get(`  https://api.themoviedb.org/3/movie/${id}/credits`,{
        params: {
            api_key: this.API_KEY
         
        }
      })
  }



  
  getMovieVideos(movieId: any): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      params: {
        api_key: this.API_KEY
      }
    });
  }





}
