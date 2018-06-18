import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { TorrentComponent } from './torrent/torrent.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DonateComponent } from './donate/donate.component';
import { HttpClientModule } from "@angular/common/http";
import { RestClientService } from "./rest-client.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TorrentComponent,
    FooterComponent,
    AboutUsComponent,
    DonateComponent,
  ],
  imports: [
		HttpClientModule,
		FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
		FormsModule,
  ],
  providers: [RestClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
