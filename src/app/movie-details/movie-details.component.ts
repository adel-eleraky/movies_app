import { Component ,Input, } from '@angular/core';
import { MovieRequestsService } from '../services/movie-requests.service';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  imports: [MovieCardComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})



export class MovieDetailsComponent {
 
    movies: any;
    movie: any ;
    credits:any;
    movieData:any;
    moviesData:any;
    trailerKey: string | null = null;
    trailerUrl: SafeResourceUrl | null = null;
    lang:any='en'
  

    constructor(
      private MovieRequestsService: MovieRequestsService,
      private activatedRoute: ActivatedRoute,
      private sanitizer: DomSanitizer


    ) {
      console.log('MovieDetailsComponent Loaded');
    }

  ngOnInit(): void {

    console.log(this.activatedRoute)
    this.activatedRoute.params.subscribe(params => {
      const param_id = params['id']

      
      this.lang=this.MovieRequestsService.getLanguage()


      this.MovieRequestsService
      .getMovieDetails(param_id,this.lang)
      .subscribe((res) => {
        console.log(res);
        this.movie=res
      });




      this.MovieRequestsService.getLanguage().subscribe((language) => {
        this.lang = language;
        this.fetchMovieDetails(param_id);
        this.fetchRecommendations(param_id)
        this.fetchCredits(param_id)


    });
        console.log(this.lang);
        

 


      // this.MovieRequestsService.getCredits(param_id).subscribe((response) => {
      //   console.log(response);
      //   this.credits=response;
      // });





    this.MovieRequestsService.getMovieVideos(param_id).subscribe((response) => {
      console.log(response);
      const video = response.results.find((video: any) => 
        video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (video) {
        this.trailerKey = video.key;
        this.trailerUrl = this.getYoutubeUrl();
      }
    });


    })

  }
  getYoutubeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.trailerKey}`
    );
  }

  fetchMovieDetails(param_id:any){

    this.MovieRequestsService
    .getMovieDetails(param_id,this.lang)
    .subscribe((res) => {
      console.log(res);
      this.movie=res
    });

  }


  fetchRecommendations(param_id:any){
  this.MovieRequestsService
  .getRecommendations(param_id,this.lang)
  .subscribe((response) => {
    console.log(response);
    this.moviesData=response
  });
  }

  fetchCredits(param_id:any){

  this.MovieRequestsService.getCredits(param_id,this.lang).subscribe((response) => {
    console.log(response);
    this.credits=response;
  });

  }


}
