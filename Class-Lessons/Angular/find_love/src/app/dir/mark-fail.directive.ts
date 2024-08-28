import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarkFail]',
  standalone: true
})
export class MarkFailDirective implements OnInit{

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.elementRef && this.elementRef.nativeElement) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'red');
    } else {
      console.error('ElementRef is not defined');
    }
  }
}
