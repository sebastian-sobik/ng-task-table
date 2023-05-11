import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationContainerComponent} from './containers/navigation-container/navigation-container.component';
import {NavAddingContainerComponent} from './containers/nav-adding-container/nav-adding-container.component';
import {
  NavPaginationContainerComponent
} from './containers/nav-pagination-container/nav-pagination-container.component';
import {NavDeletingContainerComponent} from './containers/nav-deleting-container/nav-deleting-container.component';
import {NavAddingComponent} from './components/nav-adding/nav-adding.component';
import {NavDeletingComponent} from './components/nav-deleting/nav-deleting.component';
import {NavPaginationComponent} from './components/nav-pagination/nav-pagination.component';
import {SelectComponent} from './components/nav-pagination/select/select.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [

    NavigationContainerComponent,
    NavAddingContainerComponent,
    NavPaginationContainerComponent,
    NavDeletingContainerComponent,
    NavAddingComponent,
    NavDeletingComponent,
    NavPaginationComponent,
    SelectComponent,
  ],
  exports: [
    NavigationContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class TableNavigationModule { }
