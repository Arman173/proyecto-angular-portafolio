import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public url:string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  testServive() {
    return 'Probando el servicio de angular';
  }

  saveProject( project:Project ):Observable<any> {
    const params = JSON.stringify( project );
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post( this.url + 'save-project', params, { headers } );
  } 

}
