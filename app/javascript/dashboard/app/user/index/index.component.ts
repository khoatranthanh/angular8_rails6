import { Component, OnInit , Inject} from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'list-user',
  template: require('./index.component.html')
})

export class UserIndexComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('login')) {
      this.toastr.error("Need login!");
      this.router.navigate(['']);
      return;
    }
    this.apiService.getUsers()
      .subscribe( data => {
        this.users = data.result;
      });
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}