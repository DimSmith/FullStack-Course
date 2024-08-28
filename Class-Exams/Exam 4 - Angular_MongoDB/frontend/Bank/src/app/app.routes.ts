import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NewOprComponent } from './components/new-opr/new-opr.component';

const routeConfig: Routes = [
    { path: 'homePage', component: HomePageComponent },
    { path: 'newOpr', component: NewOprComponent },
    { path: '**', redirectTo: 'homePage' }
];

export default routeConfig;