import { Component, OnInit , Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'show-test',
  template: require('./show.component.html')
})
export class TestShowComponent implements OnInit {
  roles: {};
  test: {};
  testId: string;
  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.testId = this.route.snapshot.paramMap.get('id');

    this.apiService.getTestById(this.testId)
    .subscribe( data => {
      this.test = data.result
    });
  }
}