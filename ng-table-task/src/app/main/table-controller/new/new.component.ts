import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserDataService} from "../../../user-data.service";
import {UserWithoutID} from "../../../shared/user.model";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  form = this.fb.group({
      'name' : ['', Validators.required],
      'age' : ['', Validators.required], //validate it as num>0
      'birthDate' : ['', Validators.required],
      'biography' : ''
    }
  )

  constructor(private fb: FormBuilder,
              private usersDataService: UserDataService) {}

  onSubmit() {
    if(this.form.valid) {
      // @ts-ignore
      const newUser : UserWithoutID = {...this.form.value};
      this.usersDataService.addUser(newUser);
    }
  }
}
