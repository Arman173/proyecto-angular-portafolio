import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare let $:any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() width:number = 600;

  @Output() getAutor = new EventEmitter();


  public autor:any = {
    nombre: 'Armando Canul',
    website: 'armanx.com',
    facebook: 'Haziel Canul'
  }

  constructor() { }

  ngOnInit(): void {
    $('.bxslider').bxSlider({
      mode: 'fade',
      captions: true,
      slideWidth: this.width
    });

    // lanzando evento para dar informacion al elemento padre
    this.getAutor.emit( this.autor );
  }

  lanzar( event:any ):void {
    console.log( event );
    this.getAutor.emit( this.autor );
  }

}
