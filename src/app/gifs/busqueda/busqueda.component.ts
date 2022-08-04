import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  // Busca el elemento 'txtBuscar' en el html y lo asigna a la variable que está ahí seguido (txtBuscar)
  // El signo ! se conoce como non-null assertion operator -> le asegura a TS que el objeto txtBuscar no es nulo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) {

  }

  buscar(){
    
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs( valor )
    
    this.txtBuscar.nativeElement.value = '';
  }
}
