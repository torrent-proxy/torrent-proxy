import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private _startedYear: number = 2018;
  private _currentYear: number;

  constructor() {
  }

  ngOnInit() {

  }

  getYear():string {
		const date = new Date();
		this._currentYear = date.getFullYear();

		if (this._startedYear !== this._currentYear) {
		  return `${this._startedYear}-${this._currentYear}.`;
    } else {
			return `${this._currentYear}.`;
    }
  }
}
