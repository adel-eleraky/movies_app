import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ErrorComponent } from './error/error.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        title: 'Home',

    },
    {
        path: 'moive-details/:id',
        component: MovieDetailsComponent,
        title: 'moive details',

    }
    , {
        path: 'search',
        component: SearchComponent,
        title: 'Search',

    }
    , {
        path: 'Watchlist',
        component: WatchlistComponent,
        title: 'Watchlist',

    }
    , {
        path: '**',
        component: ErrorComponent,
        title: 'Error',

    }

];
