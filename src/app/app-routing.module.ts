import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from "./page404/page404.component";
import {TableComponent} from "./table/table.component";
import {ViewsComponent} from "./views/views.component";
import {DeletingComponent} from "./table/table-controller/deleting/deleting.component";
import {NewComponent} from "./table/table-controller/new/new.component";
import {PaginationComponent} from "./table/table-controller/pagination/pagination.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: TableComponent, children: [
      {path: '', component: PaginationComponent},
      {path: 'deleting', component: DeletingComponent},
      {path: 'new', component: NewComponent}
    ]},
  {path: 'views', component: ViewsComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
