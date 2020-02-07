import { Component, OnInit , Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { first } from "rxjs/operators";
import { ApiService } from "../../service/api.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-test',
  template: require('./edit.component.html')
})
export class TestEditComponent implements OnInit {
  testId: '';
  editForm: FormGroup;
  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.testId = this.route.snapshot.paramMap.get('id');

    this.editForm = this.formBuilder.group({
      id: '',
      name: '',
      description: '',
      questions: new FormArray([])
    });

    this.apiService.getTestById(this.testId)
    .subscribe( data => {
      this.editForm.setValue({
        id: data.result.id,
        name: data.result.name,
        description: data.result.description,
        questions: []
      })

      let questionsList = <FormArray>this.editForm.controls.questions;
      data.result.questions.forEach(question => {
        questionsList.push(this.initQuestion(question))
      })
    });
  }

  initQuestion(question) {
    return this.formBuilder.group({
      id: question.id,
      title: question.title,
      description: question.description,
      answers: this.initAnswer(question.answers)
    })
  }

  initAnswer(answers) {
    let arr = new FormArray([])
    answers.forEach(answer => {
      arr.push(
        this.formBuilder.group({
          id: answer.id,
          content: answer.content,
          correct: answer.correct
        })
      )
    })
    return arr
  }

  getAnswers(form) {
    return form.controls.answers.controls;
  }

  getQuestions(form) {
    return form.controls.questions.controls;
  }

  deleteQuestion(index) {
    let control = <FormArray>this.editForm.controls.questions;
    control.removeAt(index)
  }

  deleteAnswer(control, index) {
    control.removeAt(index)
  }

  addQuestion() {
    const questions = <FormArray>this.editForm.controls.questions;
    questions.push(this.formBuilder.group({
      id: '',
      title: '',
      description: '',
      answers: new FormArray([])
    }))
  }

  addAnswer(i) {
    const answers = <FormArray>this.editForm.get('questions').controls[i].get('answers');
    answers.push(new FormGroup({
      content: new FormControl(''),
      correct: new FormControl('')
    }))
  }

  onSubmit() {
    this.apiService.updateTest(this.testId, this.editForm.value)
      .subscribe(
        data => {
          if(data.status === 200) {
            this.toastr.success('Updated Test!')
            this.router.navigate(['tests']);
          }else {
            this.toastr.error(data.message)
          }
        },
        error => {
          alert(error);
        });
  }

}