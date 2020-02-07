import { Component, OnInit , Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'show-user',
  template: require('./show.component.html')
})
export class UserShowComponent implements OnInit {
  roles: {};
  user: {};
  userId: '';
  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.apiService.getRoles()
      .subscribe( data => {
        this.roles = data.result;
        this.apiService.getUserById(this.userId)
        .subscribe( data => {
          this.user = data.result
          this.user['role'] = Object.keys(this.roles).find(key => this.roles[key] === this.user['role'])
        });
      });
  }
}