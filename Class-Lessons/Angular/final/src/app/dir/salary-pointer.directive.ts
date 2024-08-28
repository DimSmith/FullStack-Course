import { Directive, ElementRef, HostListener, OnInit,HostBinding ,Input} from '@angular/core';

@Directive({
  selector: '[appSalaryPointer]',
  standalone: true
})
export class SalaryPointerDirective implements OnInit {
  @HostBinding('style.backgroundColor') txtBackgroundColor: string = 'white';
  @Input() bgColor: string = 'white';

  constructor(private elementRef: ElementRef) { }
    ngOnInit(): void {
      this.txtBackgroundColor = this.bgColor;
    }

    @HostListener('mouseover') onMouseOver() {
      this.txtBackgroundColor = 'yellow';
    }
    
    @HostListener('mouseleave') onMouseLeave() {
      this.txtBackgroundColor = 'white';
    }
  }

