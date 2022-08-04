import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "MjyFbHWYtDg2gKC7diOOQxAFZFKQP87M";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];


  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('Historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('Resultado')!) || [];
    // if(localStorage.getItem('Historial')){
    //   this._historial = JSON.parse(localStorage.getItem('Historial')!);
    // }
  }

  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('Historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( (response) => {
        this.resultados = response.data;
        localStorage.setItem('Resultado', JSON.stringify(this.resultados));
      })

  }
}
