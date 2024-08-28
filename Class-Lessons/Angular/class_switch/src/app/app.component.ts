import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CenterDirective } from './dir/center.directive';
import { NgClass} from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CenterDirective, NgClass,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'class_switch';

  currentIndex = 0;
  classes = ['red', 'green', 'blue'];

  changeStyle() {
    this.currentIndex = (this.currentIndex + 1) % this.classes.length;
  }

}
