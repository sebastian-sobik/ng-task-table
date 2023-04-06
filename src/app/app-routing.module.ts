import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Page404Component} from "./page404/page404.component";
import {MainComponent} from "./main/main.component";
import {ViewsComponent} from "./views/views.component";
import {DeletingComponent} from "./main/table-controller/deleting/deleting.component";
import {EditingComponent} from "./main/table-controller/editing/editing.component";
import {NewComponent} from "./main/table-controller/new/new.component";
import {PaginationComponent} from "./main/table-controller/pagination/pagination.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, children: [
      {path: '', component: PaginationComponent},
      {path: 'deleting', component: DeletingComponent},
      {path: 'editing:id', component: EditingComponent},
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
