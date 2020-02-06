import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private toastr: ToastrService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }
    this.apiService.login(loginPayload).subscribe(data => {
      if(data.status === 200) {
        this.toastr.success('Logged in!');
        window.localStorage.setItem('login', 'true');
        this.router.navigate(['users']);
      }else {
        this.toastr.error(String(data.message));
      }
    });
  }

  ngOnInit() {
    if(window.localStorage.getItem('login')) {
      this.toastr.error("Already login!");
      this.router.navigate(['users']);
      return;
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
}
