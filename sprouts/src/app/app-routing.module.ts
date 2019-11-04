import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SproutsComponent } from './components/sprouts/sprouts.component';
import { SetupComponent } from './components/setup/setup.component';

const routes: Routes = [
	{
		path:'',
		redirectTo:'/home',
		pathMatch:'full'
	},
	{
		path:'home',
		component:HomeComponent
	},
	{
		path:'sprouts/:nodes/:players',
		component:SproutsComponent
	},
	{
		path:'setup',
		component:SetupComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
