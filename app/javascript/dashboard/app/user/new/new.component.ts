import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'new-user',
  template: require('./new.component.html')
})
export class UserNewComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService, private toastr: ToastrService) { }

  addForm: FormGroup;
  roles: {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.apiService.getRoles()
      .subscribe( data => {
        this.roles = data.result;
      });
  }

  onSubmit() {
    this.apiService.createUser(this.addForm.value)
      .subscribe( data => {
        if(data.status === 200) {
          this.toastr.success('Created user!');
          this.router.navigate(['users']);
        }else {
          this.toastr.error(data.message);
        }
      });
  }

}