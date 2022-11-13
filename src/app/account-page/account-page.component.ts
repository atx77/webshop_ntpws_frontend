import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UpdatePersonalInformationForm } from '../model/form/update-personal-information-form.model';
import { Order } from '../model/order.model';
import { User } from '../model/user.model';
import { UserService } from '../user/user.service';
import { AccountPageService } from './account-page.service';
import { faInfoCircle, faAngleDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit, OnDestroy {

  updatePersonalInformationFormModel: UpdatePersonalInformationForm;
  subscribtion: Subscription;
  orders$: Observable<Order[]>;
  loggedUser$: Observable<User>;

  faInfoCircle = faInfoCircle;
  faAngleDown = faAngleDown;
  faUserCircle = faUserCircle;
  
  constructor(private userService: UserService,
    private accountPageService: AccountPageService) { }

  ngOnInit(): void {
    this.updatePersonalInformationFormModel = new UpdatePersonalInformationForm();
    this.loggedUser$ = this.userService.getLoggedUser();
    this.orders$ = this.accountPageService.getAllOrders();
    this.subscribtion = this.loggedUser$.subscribe((user: User) => {
      this.updatePersonalInformationFormModel.firstName = user.firstName;
      this.updatePersonalInformationFormModel.lastName = user.lastName;
    })
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  updatePersonalInformation(): void {
    this.subscribtion = this.userService.updatePersonalInformation(this.updatePersonalInformationFormModel)
      .subscribe(() => {});
  }
}
