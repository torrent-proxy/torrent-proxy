import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/internal/operators';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
	constructor(
		public router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		private translate: TranslateService) {
		translate.setDefaultLang('en');
		translate.use('en');
	}

	private _currentLanguage = 'en';

	ngOnInit() {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.pipe(map(() => this.activatedRoute))
			.pipe(map((route) => {
				while (route.firstChild) {
					route = route.firstChild;
				}
				return route;
			}))
			.pipe(filter((route) => route.outlet === 'primary'))
			.pipe(mergeMap((route) => route.data))
			.subscribe((event) => this.titleService.setTitle(event['title']));
	}

	getCurrentLanguage(): string {
		return this._currentLanguage;
	}

	setLanguage(lang) {
		this._currentLanguage = lang;
		this.translate.use(lang);
	}
}
