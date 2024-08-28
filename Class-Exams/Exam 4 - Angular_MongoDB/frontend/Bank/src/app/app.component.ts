import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NewOprComponent } from './components/new-opr/new-opr.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomePageComponent, NewOprComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bank';
}
