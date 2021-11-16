import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   guardar(){
    var overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'), 
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');
    this.accionCerrar(btnCerrarPopup,popup,overlay); 
  }
}
