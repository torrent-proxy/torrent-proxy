import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_PROPERTIES } from './ServerProperties';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  private serverURL = SERVER_PROPERTIES.BACKEND_URL;

  constructor(private http: HttpClient) { }
}
