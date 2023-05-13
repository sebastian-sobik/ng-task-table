import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {UserDataService} from "../../../user-data.service";
import {User, UserWithoutID} from "../../../shared/user.model";
import {TableNavigationFacadeService} from "../../table-navigation-facade.service";


@Component({
  selector: 'app-nav-adding',
  templateUrl: './nav-adding.component.html',
  styleUrls: ['./nav-adding.component.scss']
})
export class NavAddingComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @Input() isEditing : boolean = undefined;
  @Input() editingID : number | undefined = undefined
  @Input("editingUser") user : User | undefined = undefined

  closed = true;

  form = this.fb.group({
      'name': ['', Validators.required],
      'age': [0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      'birthDate': [new Date().toISOString().slice(0, 10) as string, [Validators.required, Validators.pattern(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)]],
      'biography': ['', [Validators.maxLength(250)]]
    }
  )

  constructor(protected fb: NonNullableFormBuilder,
              protected usersDataService: UserDataService,
              protected tableNavigationService: TableNavigationFacadeService) {
  }

  ngOnInit() {
    this.form.setValue({
      'name': this.user?.name ?? "",
      'age': this.user?.age ?? 0,
      'birthDate': this.user?.birthDate.toISOString().slice(0, 10) as string ?? "",
      'biography': this.user?.biography ?? ''
    })
  }

  ngAfterViewInit() {
    setTimeout(
      () => {this.closed = false;}, 0
    )
  }

  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      const newUser: UserWithoutID = {...this.form.value, birthDate: new Date(this.form.value.birthDate)};
      if (this.isEditing) {
        // @ts-ignore
        this.usersDataService.updateUser(this.editingID, newUser)
        this.onCancel();
      } else {
        this.usersDataService.addUser(newUser);
      }
      this.form.reset();
    }
  }

  onCancel() {
    this.closed = true;
  }

  @HostListener('transitionend', ['$event'])
  onTransitionEnd(event: TransitionEvent) {
    if(this.closed && event.propertyName == 'height') {
      this.tableNavigationService.pickPagination();
    }
  }
}
