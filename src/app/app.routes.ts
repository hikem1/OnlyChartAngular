import { Routes } from '@angular/router';
import { GraphTabsComponent } from './graph-tabs/graph-tabs.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    {path: '', component: GraphTabsComponent},
    {path: 'favorites', component: FavoriteListComponent},
    {path: 'sign-in', component: SignInComponent}
];
