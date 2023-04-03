import {Component, Input} from '@angular/core';
import {users} from "../../fakeUsers";
import {User} from "../../user.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  data: User[] = [...users];
}
