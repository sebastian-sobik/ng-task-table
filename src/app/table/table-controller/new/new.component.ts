import {AfterViewChecked, Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserDataService} from "../../../user-data.service";
import {User, UserWithoutID} from "../../../shared/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements AfterViewChecked, OnDestroy {
  subscription : Subscription | undefined;
  closed = true;
  isEditing = false;
  user : User = {
    name: '',
    age: 0,
    birthDate: new Date(),
    biography: '',
    id: -1
  };

  form = this.fb.group({
      'name': ['', Validators.required],
      'age': ['', Validators.required], //validate it as num>0
      'birthDate': ['', Validators.required],
      'biography': ''
    }
  )

  constructor(private fb: FormBuilder,
              private usersDataService: UserDataService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscription = this.route.queryParams
      .subscribe(
        queryParams => {
          console.log(this.route)
          this.isEditing = queryParams['isEditing'] === "true"
          if(this.isEditing) {
            const id = queryParams['userID'];
            if(id) {
              const user = usersDataService.getUser(id);
              if(user) {
                this.user = user;
              }
            }
          }
        }
      )
  }

  ngAfterViewChecked() {
    this.closed = false;
  }

  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      const newUser: UserWithoutID = this.user;

      if(this.isEditing) {
        this.usersDataService.updateUser(this.user.id, newUser)
        this.router.navigate(['main'])
      }
      else {
        this.usersDataService.addUser(newUser);
      }
      this.form.reset();
    }
  }

  onCancel() {
    this.closed = !this.closed;
    setTimeout(
      () => {
        this.router.navigate(['main'])
      }, 400
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}
