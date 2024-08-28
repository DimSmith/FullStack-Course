import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appMarker]',
  standalone: true
})
export class MarkerDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }
    ngOnInit(): void {
      console.log('MarkerDirective initialized');
      this.elementRef.nativeElement.style.backgroundColor = 'red';
      this.elementRef.nativeElement.style.color = 'white';
    }

    @HostListener('mouseover') onMouseOver() {
      this.elementRef.nativeElement.style.backgroundColor = 'blue';
      let text = this.elementRef.nativeElement.innerText;
      if(!text.includes('John')) {
        this.elementRef.nativeElement.innerText = text + ' (mouseover)';
      }
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.elementRef.nativeElement.style.backgroundColor = 'red';
      let text = this.elementRef.nativeElement.innerText;
      this.elementRef.nativeElement.innerText = text.replace(' (mouseover)', '');
    }
  }


