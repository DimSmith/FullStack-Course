import { NgFor, } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgFor,NgClass,NgSwitch,NgSwitchCase,NgSwitchDefault],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'class3';

  names_array = ['student1', 'student2', 'student3', 'student4', 'student5', 'student6', 'student7'];
  random_array = ['boy','girl','vika','boy','dima','boy','girl','girl','boy','boy','boy'];
  boy='boy';
  girl='girl';
}
