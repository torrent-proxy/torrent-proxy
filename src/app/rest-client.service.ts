import {Injectable, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from "./config";

@NgModule({
  imports: [HttpClient],
  providers: [RestClientService]
})

@Injectable()
export class RestClientService {

  private serverURL = CONFIG.BACKEND_URL;

  constructor(private http: HttpClient) { }
}
