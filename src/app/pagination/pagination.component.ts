import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieRequestsService } from '../services/movie-requests.service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() totalPages!: number;
  @Input() currentPage: number = 1;
  pageRange: number[] = [];
  moviesData: any;

  @Output() sendCurrentPage = new EventEmitter<number>();
  // @Output() sendLimitOfProducts = new EventEmitter<number>();

  constructor(private MovieRequestsService: MovieRequestsService) {}
  ngOnChanges() {
    this.pageRange = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageRange.push(i);
    }
    // this.MovieRequestsService.getMovies('en', this.currentPage).subscribe(
    //   (movies) => {
    //     this.moviesData = movies.results;
    //     console.log(movies);
    //     this.totalPages = movies.total_pages;
    //   }
    // );
  }
  goToPage(page: number) {
    this.currentPage = page;
    console.log(this.currentPage);

    this.sendCurrentPage.emit(this.currentPage);
  }
}
