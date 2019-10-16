import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SetupComponent } from './components/setup/setup.component';
import { SproutsComponent } from './components/sprouts/sprouts.component';
import { VisComponent } from './components/vis/vis.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SetupComponent,
    SproutsComponent,
    VisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
