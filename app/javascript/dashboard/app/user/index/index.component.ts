import { Component, OnInit , Inject} from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'list-user',
  template: require('./index.component.html')
})

export class UserIndexComponent implements OnInit {

  users: [];

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

  deleteUser(user): void {
    if(confirm("Are you sure to delete this user?")) {
      this.apiService.deleteUser(user.id)
        .subscribe( data => {
          this.toastr.success('Deleted User!')
          this.users = this.users.filter(u => u !== user);
        })
    }
  };

  addUser(): void {
    this.router.navigate(['users/new']);
  };
}