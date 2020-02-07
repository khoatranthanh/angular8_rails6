import { Component, OnInit , Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { ApiService } from "../../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-user',
  template: require('./edit.component.html')
})
export class UserEditComponent implements OnInit {
  roles: {};
  userId: "";
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.apiService.getRoles()
      .subscribe( data => {
        this.roles = data.result;
        this.apiService.getUserById(this.userId)
        .subscribe( data => {
          this.editForm.setValue(data.result);
        });
      });
  }

  onSubmit() {
    this.apiService.updateUser(this.userId, this.editForm.value)
      .subscribe(
        data => {
          if(data.status === 200) {
            this.toastr.success('Updated User!')
            this.router.navigate(['users']);
          }else {
            this.toastr.error(data.message)
          }
        },
        error => {
          alert(error);
        });
  }

}