import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client.service';
import { CONFIG } from "../config";


@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})

export class TorrentComponent implements OnInit {
	private _files: any[] = [];
	private _loading: boolean = false;
	private _magnetLink: string = '';
	private _serverUrl: string = CONFIG.BACKEND_URL;
	private _currentListDisplay: number = 0;
	private _itemsToShow: any[] = [];
	private _pagesCount: number = 0;


  constructor( private _restClientService : RestClientService) {

  }

  ngOnInit() {
  }

  buildFileList(magnet: string): void {
  	this._currentListDisplay = 0;
    this._magnetLink = magnet;
    this._loading = true;
    this.getFileList()
			.then(() => this._loading = false)
	}

	getFileList():Promise<any> {
		return (this._restClientService.getFileList(this._magnetLink)
			.then(data => {
				this._files = data['files'];
				console.log(this._files);
				this.setDisplayedFiles(this._currentListDisplay);
				this.setPagesButtonsNumber();
			})
			.catch(err => {
				console.log(err);
			}))
	}

	setDisplayedFiles(listNumber: number):void {
  	let fileList = this._files;
  	this._currentListDisplay = listNumber;
  	let firstItem: number = this._currentListDisplay * CONFIG.FILE_LIST_ITEMS_LENGTH;
  	let lastItem: number = firstItem + CONFIG.FILE_LIST_ITEMS_LENGTH;

  	if (lastItem > fileList.length) {
  		lastItem = fileList.length;
		}

  	this._itemsToShow = [];

  	for (let i = firstItem; i < lastItem; i++) {
			this._itemsToShow.push(fileList[i]);
		}
	}

	getFileName(path: string): string {
		return (path.substr(0 ,path.lastIndexOf("."))).split(/[\\/]/).pop();
	}

	setPagesButtonsNumber():void {
  	this._pagesCount = Math.ceil(this._files.length/CONFIG.FILE_LIST_ITEMS_LENGTH);
	}

	setDownloadUrl(path:string): string {
  	return `${this._serverUrl}/download/${encodeURIComponent(this._magnetLink)}/${encodeURIComponent(path)}`;
	}

	getPagesCount(): number {
  	return this._pagesCount;
	}

  clearList(): void {
    this._files = [];
    this._itemsToShow = [];
    this._magnetLink = '';
		this._pagesCount = 0;
  }

  isLoading(): boolean {
  	return this._loading;
	}

	getFiles(): object {
  	return this._itemsToShow;
	}

	getCurrentDisplayList(): number {
  	return this._currentListDisplay;
	}

	getDummyArray(): any[] {
  	let arr = [];
  	for (let i = 0; i < this._pagesCount; i++) {
  		arr.push(i);
		}
		return arr;
	}
}
