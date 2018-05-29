import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TorrentComponent} from './torrent/torrent.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {DonateComponent} from './donate/donate.component';

const routes: Routes = [
    {path: '', redirectTo: '/torrent', pathMatch: 'full'},
    {path: 'torrent', component: TorrentComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'donate', component: DonateComponent}
    ];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
