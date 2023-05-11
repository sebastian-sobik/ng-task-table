import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localePl from '@angular/common/locales/pl';
import localeEn from '@angular/common/locales/en';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {HeaderComponent} from './header/header.component';
import {ViewsComponent} from './views/views.component';
import {Page404Component} from './page404/page404.component';
import {RowComponent} from './table/table-data/row/row.component';
import {PaginationComponent} from './table/table-controller/pagination/pagination.component';
import {DeletingComponent} from './table/table-controller/deleting/deleting.component';
import {NewComponent} from './table/table-controller/new/new.component';
import {SelectComponent} from './table/table-controller/pagination/select/select.component';
import {TableDataComponent} from "./table/table-data/table-data.component";
import {TableNavigationModule} from "./table-navigation/table-navigation.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localePl);
registerLocaleData(localeEn);

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HeaderComponent,
    ViewsComponent,
    Page404Component,
    RowComponent,
    TableComponent,
    PaginationComponent,
    DeletingComponent,
    NewComponent,
    SelectComponent,
    TableDataComponent,
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
    HttpClientModule,
    TableNavigationModule
  ],
  exports: [
    TranslateModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
