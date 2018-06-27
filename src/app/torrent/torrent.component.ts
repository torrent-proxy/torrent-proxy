import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client.service';
import { CONFIG } from '../config';


const FILE_LIST_LENGTH = 10;

@Component({
	selector: 'app-torrent',
	templateUrl: './torrent.component.html',
	styleUrls: ['./torrent.component.scss']
})

export class TorrentComponent implements OnInit {
	private files: any[] = [];
	private loading = false;
	private magnetLink = '';
	private serverUrl: string = CONFIG.BACKEND_URL;
	private currentListDisplay = 0;
	private itemsToShow: any[] = [];


	constructor( private restClientService: RestClientService) {

	}

	ngOnInit() {
	}

	buildFileList(magnet: string): void {
		this.currentListDisplay = 0;
		this.magnetLink = magnet;
		this.loading = true;
		this.getFileList()
			.then(() => this.loading = false);
	}

	getFileList(): Promise<any> {
		return (this.restClientService.getFileList(this.magnetLink)
			.then(data => {
				this.files = data['files'];
				this.setDisplayedFiles(this.currentListDisplay);
			})
			.catch(err => {
				console.log(err);
			}));
	}

	setDisplayedFiles(listNumber: number): void {
		const fileList = this.files;
		this.currentListDisplay = listNumber;
		const firstItem: number = this.currentListDisplay * FILE_LIST_LENGTH;
		let lastItem: number = firstItem + FILE_LIST_LENGTH;

		if (lastItem > fileList.length) {
			lastItem = fileList.length;
		}

		this.itemsToShow = [];

		for (let i = firstItem; i < lastItem; i++) {
			this.itemsToShow.push(fileList[i]);
		}
	}

	startFileDownload(path) {
		const url = this.createDownloadUrl(path);
		const a = document.createElement('a');

		document.body.appendChild(a);

		a.setAttribute('style', 'display: none;');
		a.href = url;
		a.download = this.getFileName(path);

		a.click();
		a.remove();
	}

	getFileName(path: string): string {
		return (path.substr(0 , path.lastIndexOf('.'))).split(/[\\/]/).pop();
	}

	getFileType(path: string) {
		return (path.substr(path.lastIndexOf('.') + 1, path.length)).split(/[\\/]/).pop();
	}

	createDownloadUrl(path: string): string {
		return `${this.serverUrl}/download/${encodeURIComponent(this.magnetLink)}/${encodeURIComponent(path)}`;
	}

	getPagesCount(): number {
		return Math.ceil(this.files.length / FILE_LIST_LENGTH);
	}

	clearList(): void {
		this.files = [];
		this.itemsToShow = [];
		this.magnetLink = '';
	}

	isLoading(): boolean {
		return this.loading;
	}

	getFiles(): Array<any> {
		return this.itemsToShow;
	}

	getCurrentDisplayList(): number {
		return this.currentListDisplay;
	}

	getDummyArray(): any[] {
		return Array(this.getPagesCount());
	}
}
