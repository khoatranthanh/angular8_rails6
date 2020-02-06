import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'new-test',
  template: require('./new.component.html')
})
export class TestNewComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService, private toastr: ToastrService) { }

  addForm: FormGroup;
  roles: {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.apiService.createTest(this.addForm.value)
      .subscribe( data => {
        if(data.status === 200) {
          this.toastr.success('Created test!');
          this.router.navigate(['tests']);
        }else {
          this.toastr.error(data.message);
        }
      });
  }

}