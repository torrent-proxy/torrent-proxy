import {Injectable, NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CONFIG } from "./config";

@NgModule({
  imports: [HttpClient],
  providers: [RestClientService]
})

@Injectable()
export class RestClientService {

  private serverURL = CONFIG.BACKEND_URL;

  constructor(private http: HttpClient) { }

  getFileList(magnet): Promise<Object> {
    let url = `${this.serverURL + 'rnd2/'}${encodeURIComponent(magnet)}`;

    return this.http.get(url)
      .toPromise()
      .then((data) =>{
				return data;
      })
      .catch(err => {
				return Promise.reject(err.error || 'Server error');
      })
  }

  downloadFile(magnet, path) {
    let url = `download/${encodeURIComponent(magnet)}/${encodeURIComponent(path)}`;
    return this.http.get(url);
  }
}
