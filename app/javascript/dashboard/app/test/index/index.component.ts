import { Component, OnInit , Inject} from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'list-test',
  template: require('./index.component.html')
})

export class TestIndexComponent implements OnInit {

  tests: [];

  constructor(private router: Router, private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.apiService.getTests()
      .subscribe( data => {
        this.tests = data.result;
      });
  }

  deleteTest(test): void {
    if(confirm("Are you sure to delete this test?")) {
      this.apiService.deleteTest(test.id)
        .subscribe( data => {
          this.toastr.success('Deleted Test!')
          this.tests = this.tests.filter(t => t !== test);
        })
    }
  };

  addTest(): void {
    this.router.navigate(['tests/new']);
  };
}