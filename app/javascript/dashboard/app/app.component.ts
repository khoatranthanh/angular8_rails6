import { Component } from '@angular/core';
import { ApiService } from "./service/api.service";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard',
  template: require('./app.component.html'),
  style: require('./app.component.css')
})

export class AppComponent {
  name = 'Angular!';
  login = 'true';

  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  logout(): void {
    if(confirm("Are you sure to logout?")) {
      this.apiService.logout()
        .subscribe( data => {
          window.localStorage.removeItem('login')
          this.router.navigate(['']);
          this.toastr.success('Logged out!')
        })
    }
  };

  ngAfterViewChecked() {
    this.login = window.localStorage.getItem('login')
  }
}
