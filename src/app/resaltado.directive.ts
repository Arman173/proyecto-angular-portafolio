import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor( ele:ElementRef ) {
    ele.nativeElement.style.background = "#ccc";
    ele.nativeElement.style.borderBottom = "4px solid grey"
    ele.nativeElement.style.padding = "10px";
  }

}
