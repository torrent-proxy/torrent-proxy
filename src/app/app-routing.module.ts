import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TorrentComponent } from './torrent/torrent.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DonateComponent } from './donate/donate.component';

const routes: Routes = [{
	path: '',
	redirectTo: '/torrent',
	pathMatch: 'full',
	data: { title: 'Torrent proxy: Download' }
}, {
	path: 'torrent',
	component: TorrentComponent,
	data: { title: 'Torrent proxy: Download' }
}, {
	path: 'about-us',
	component: AboutUsComponent,
	data: { title: 'Torrent proxy: About Us' }
}, {
	path: 'donate',
	component: DonateComponent,
	data: { title: 'Torrent proxy: Donate' }
}];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
