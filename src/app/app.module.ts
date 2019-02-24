import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PathChooserComponent} from './path-chooser.component';
import {PathService} from './path-service';

@NgModule({
  declarations: [
    AppComponent,
    PathChooserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PathService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
