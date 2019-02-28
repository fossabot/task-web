import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  isLoadingResults = false;
  taskForm: FormGroup;

  constructor(private taskService: TaskService,
              private router: Router,
              private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null, Validators.required]
    })
  }

  onSubmit(form: NgForm) {
    console.log('onSubmit');
    this.save(form);
  }

  save(form: NgForm) {
    console.log('save');
    this.isLoadingResults = true;
    this.taskService.createTask(new Task(form['title'], form['description']))
      .subscribe(
        response => {
          console.log(response);
          let id = response['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/tasks']);
        },
        error => {
          console.log(error);
          this.isLoadingResults = false;
        });
  }
}
