import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroenteDetailsComponent } from './groente-details/groente-details/groente-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WinkelmandjeComponent } from './winkelmandje/winkelmandje/winkelmandje.component';

@NgModule({
  declarations: [
    AppComponent,
    GroenteDetailsComponent,
    WinkelmandjeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
