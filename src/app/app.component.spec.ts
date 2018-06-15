import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TorrentComponent } from "./torrent/torrent.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { DonateComponent } from "./donate/donate.component";
import { FormsModule } from "@angular/forms";

let routes = [{path: '', redirectTo: '/torrent', pathMatch: 'full', data: {title: 'Torrent proxy: Download'}},
	{path: 'torrent', component: TorrentComponent, data: {title: 'Torrent proxy: Download'}},
	{path: 'about-us', component: AboutUsComponent, data: {title: 'Torrent proxy: About Us'}},
	{path: 'donate', component: DonateComponent, data: {title: 'Torrent proxy: Donate'}}];
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        AppComponent,
        FooterComponent,
        TorrentComponent,
        AboutUsComponent,
        DonateComponent,
      ],
      imports: [RouterTestingModule.withRoutes(routes), FormsModule],
			providers: [ ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
