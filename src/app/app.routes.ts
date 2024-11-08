import { Routes } from '@angular/router';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SearchListComponent } from './search-list/search-list.component';
import { GraphTabComponent } from './graph-tab/graph-tab.component';

export const routes: Routes = [
    {path: '', component: GraphTabComponent},
    {path: 'favorites', component: FavoriteListComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'search', component: SearchListComponent},
];
