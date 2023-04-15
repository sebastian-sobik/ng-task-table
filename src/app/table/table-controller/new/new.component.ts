import {Component, OnDestroy} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {UserDataService} from "../../../user-data.service";
import {UserWithoutID} from "../../../shared/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnDestroy {
  subscription: Subscription | undefined;
  closed = false;
  isEditing = false;
  editingID: number = -1;

  form = this.fb.group({
      'name': ['', Validators.required],
      'age': [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      'birthDate': [new Date().toISOString().slice(0, 10) as string, [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)]],
      'biography': ['', [Validators.maxLength(250)]]
    }
  )

  constructor(private fb: NonNullableFormBuilder,
              private usersDataService: UserDataService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscription = this.route.queryParams
      .pipe(filter(
        qParams => {
          const isEditing = qParams['isEditing'] === "true"
          const id = qParams['userID'];
          return isEditing && id;
        }
      ))
      .subscribe(
        qParams => this.initEditingForm(qParams['userID'])
      )
  }

  private initEditingForm(id: number) {
    this.isEditing = true;
    this.editingID = id;
    const user = this.usersDataService.getUser(id);
    this.form.setValue({
      'name': user.name,
      'age': user.age,
      'birthDate': user.birthDate.toISOString().slice(0, 10) as string,
      'biography': user.biography ?? ''
    })
  }

  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      const newUser: UserWithoutID = {...this.form.value, birthDate: new Date(this.form.value.birthDate)};
      if (this.isEditing) {
        this.usersDataService.updateUser(this.editingID, newUser)
        this.router.navigate(['main'])
      } else {
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
