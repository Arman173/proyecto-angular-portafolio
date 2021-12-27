import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  
  public modify:boolean = false;
  public show:boolean = true;
  public widthSlider:number = 600;
  public autor:any;

  public textos_forma_clasica:any; // obtener elementos del DOM de la forma clasica
  @ViewChild('textos') textos:any; // obtener elementos del DOM con el viewChild de angular

  constructor() { }

  ngOnInit(): void {
    this.textos_forma_clasica = document.querySelector('#textos');

    console.log('textos de la forma clasica:', this.textos_forma_clasica.innerHTML);
  }
  
  ngAfterViewInit() {
    console.log('textos con el viewChild de angular:', this.textos.nativeElement.innerText);
  }

  showRange():void {
    this.modify = true;
  }

  hideRange():void {
    this.modify = false;
  }

  hide():void {
    this.show = false;
    console.log('hidding');
  }

  changeSize():void {
    console.log('changing width!');
    this.show = true;
  }

  getAutor( event:any ):void {
    this.autor = event;
  }

}
