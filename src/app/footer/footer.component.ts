import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private startedYear: number = 2018;
  private currentYear: number;

  constructor() {
  }

  ngOnInit() {

  }

  getYear():string {
		const date = new Date();
		this.currentYear = date.getFullYear();

		if (this.startedYear !== this.currentYear) {
		  return `${this.startedYear}-${this.currentYear}.`;
    } else {
			return `${this.currentYear}.`;
    }
  }
}
