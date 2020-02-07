import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'new-test',
  template: require('./new.component.html')
})
export class TestNewComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private toastr: ToastrService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      questions: new FormArray([]),
    });
  }

  initQuestion() {
    return new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      answers: new FormArray([])
    })
  }

  initAnswer() {
    return new FormGroup({
      content: new FormControl(''),
      correct: new FormControl(false)
    })
  }

  getAnswers(form) {
    return form.controls.answers.controls;
  }

  getQuestions(form) {
    return form.controls.questions.controls;
  }

  deleteQuestion(index) {
    let control = <FormArray>this.addForm.controls.questions;
    control.removeAt(index)
  }

  deleteAnswer(control, index) {
    control.removeAt(index)
  }

  addQuestion() {
    const questions = <FormArray>this.addForm.get('questions');
    questions.push(this.initQuestion())
  }

  addAnswer(control, i) {
    control.push(this.initAnswer())
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