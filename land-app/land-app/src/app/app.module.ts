import { NgModule } from '@angular/core'; 
import { FormsModule } from "@angular/forms"; 
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from "./app-routing.module"; 
import { AppComponent } from './app.component'; 
import { LandDetailsComponent } from './land-details/land-details.component'; 
import { LandenComponent } from './landen/landen.component'; 
import { TopInwonersComponent } from './top-inwoners/top-inwoners.component'; 
import { HttpClientModule } from "@angular/common/http"; 
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; 
import { InMemoryDataService } from './in-memory-data.service'; 

@NgModule({
 declarations: [ 
 AppComponent,
 LandenComponent,
 LandDetailsComponent,
 TopInwonersComponent
 ],
 imports: [ 
 BrowserModule,FormsModule, AppRoutingModule, HttpClientModule, 
 HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { } 