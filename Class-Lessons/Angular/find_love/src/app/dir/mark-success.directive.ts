import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appMarkSuccess]',
  standalone: true
})
export class MarkSuccessDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background="green";
    this.elementRef.nativeElement.style.color="black";
}
}
