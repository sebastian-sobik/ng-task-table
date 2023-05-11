import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from "./page404/page404.component";
import {TableComponent} from "./table/table.component";
import {ViewsComponent} from "./views/views.component";

const routes: Routes = [
  {path: '', component: TableComponent, pathMatch: 'full'},
  {path: 'views', component: ViewsComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
