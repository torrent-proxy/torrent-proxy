import { Component, OnInit } from '@angular/core';
import { RestClientService} from '../rest-client.service';


@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  sendLink(url) {
      console.log(url);
  }

}
