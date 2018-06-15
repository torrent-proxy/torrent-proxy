import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client.service';
import { CONFIG } from "../config";


@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})


export class TorrentComponent implements OnInit {
	public files;
	public error;
	public loading = false;
	public magnetLink;


  constructor( private restClientService : RestClientService) {

  }

  ngOnInit() {
  }

  buildFileList(magnet) {
    this.magnetLink = magnet;
    this.loading = true;
    this.magnetLink = magnet;
    this.restClientService.getFileList(this.magnetLink)
      .then(data => {
        this.files = data['files'];
				this.loading = false;
      })
      .catch(err => {
        this.error = err;
      })

	}

	downloadItem(itemPath) {
    this.loading = true;
    this.restClientService.downloadFile(this.magnetLink, itemPath).subscribe(() => {
      this.loading = false;
    });
  }

  clearList() {
    this.files = null;
    this.magnetLink = null;
  }

}
