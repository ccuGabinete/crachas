import { MongoService } from './services/mongo/mongo.service';
import { SccaService } from './services/scca/scca.service';
import { Autorizado } from './models/autorizado/autorizado';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    Autorizado,
    SccaService,
    MongoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
