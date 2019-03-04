import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  taskForm: FormGroup;
  _id: number;
  isLoadingResults = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private taskService: TaskService) { }

  ngOnInit() {
    this.getTask(this.route.snapshot.params['id']);
    this.taskForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    })
  }

  getTask(id: number) {
    this.isLoadingResults = true;
    this.taskService.getTask(id).subscribe(response => {
      console.log(response);
      this._id = response.id;
      this.taskForm.setValue({
        title: response.title,
        description: response.description
      });
      this.isLoadingResults = false;
    }, error => {
      console.log(error);
      this.isLoadingResults = false;
    })
  }

  productDetails() {
    this.router.navigate(['/tasks-detail', this._id]);
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    let task = new Task(form['title'], form['description']);
    task.id = this._id;
    this.taskService.updateTask(task)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/tasks-detail', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
