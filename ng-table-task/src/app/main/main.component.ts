import { Component } from '@angular/core';
import {UserData} from "../userData.model";
import {users, id} from "../fakeUsers";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  data: UserData[] = [...users];
}
