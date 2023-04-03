import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { ViewsComponent } from './views/views.component';
import { Page404Component } from './page404/page404.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { TableControllerComponent } from './main/table-controller/table-controller.component';
import {registerLocaleData} from "@angular/common";
import localePl from '@angular/common/locales/pl';
import localeEn from '@angular/common/locales/en';
import { RowComponent } from './main/table/row/row.component';
import { TableComponent } from './main/table/table.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localePl);
registerLocaleData(localeEn);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    ViewsComponent,
    Page404Component,
    TableControllerComponent,
    RowComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
