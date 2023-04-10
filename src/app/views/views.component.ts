import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../user-data.service";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit{
  data : User[] | undefined;

  constructor(private usersService: UserDataService) {
  }

  ngOnInit() {
    this.data = this.usersService.getAllUsers();
  }
}
