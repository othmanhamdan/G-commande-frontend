
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './bc/page-not-found/page-not-found.component';
import { TokenInterceptorProvider } from './helpers/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,    
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [TokenInterceptorProvider,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
