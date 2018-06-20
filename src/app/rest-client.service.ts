import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CONFIG } from './config';

@NgModule({
	imports: [ HttpClientModule ],
	providers: [ RestClientService ]
})

@Injectable()
export class RestClientService {

	private serverURL = CONFIG.BACKEND_URL;

	constructor(private _http: HttpClient) { }

	getFileList(magnet): Promise<Object> {
		const url = `${this.serverURL + '/rnd2/'}${encodeURIComponent(magnet)}`;

		return this._http.get(url)
			.toPromise()
			.then((data) => {
				return data;
			})
			.catch(err => {
				return Promise.reject(err.error || 'Server error');
			});
	}
}
