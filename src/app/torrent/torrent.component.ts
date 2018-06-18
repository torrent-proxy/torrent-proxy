import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client.service';
import { CONFIG } from "../config";


@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})

export class TorrentComponent implements OnInit {
	private _files: object = [];
	private _loading: boolean = false;
	private _magnetLink: string = '';
	private _serverUrl = CONFIG.BACKEND_URL;


  constructor( private _restClientService : RestClientService) {

  }

  ngOnInit() {
  }

  buildFileList(magnet): Promise<any> {
    this._magnetLink = magnet;
    this._loading = true;
		return this._restClientService.getFileList(this._magnetLink)
			.then(data => {
				this._files = data['files'];
				this._loading = false;
			})
			.catch(err => {
				console.log(err);
			})

	}

	setDownloadUrl(path): string {
  	return `${this._serverUrl}/download/${encodeURIComponent(this._magnetLink)}/${encodeURIComponent(path)}`;
	}

  clearList(): void {
    this._files = [];
    this._magnetLink = '';
  }

  isLoading(): boolean {
  	return this._loading;
	}

	getFiles(): object {
  	return this._files;
	}
}
