import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
 import { HttpModule } from '@angular/http';
import { HttpClientModule  } from '@angular/common/http';

import { AppComponent } from './app.component';


import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, HttpModule, FormsModule, ChartsModule ],
  declarations: [ AppComponent ],
  providers: [WeatherService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
