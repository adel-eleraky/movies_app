import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchComponent } from './search/search.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavComponent,ErrorComponent,HeaderComponent,MovieDetailsComponent,SearchComponent,WatchlistComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}
