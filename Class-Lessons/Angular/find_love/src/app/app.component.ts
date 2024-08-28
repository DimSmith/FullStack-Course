import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MarkFailDirective } from './dir/mark-fail.directive';
import { MarkSuccessDirective } from './dir/mark-success.directive';
import { CenterDirective } from './dir/center.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, MarkFailDirective, MarkSuccessDirective, CenterDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year=0
}
