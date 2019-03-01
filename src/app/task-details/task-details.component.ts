import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  isLoadingResults: boolean = false;
  task: Task;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService) { }

  ngOnInit() {
    this.getTask(this.route.snapshot.params['id']);
  }

  getTask(id: number) {
    this.isLoadingResults = true;
    this.taskService.getTask(id)
      .subscribe(response => {
        console.log(response);
        this.task = response;
        this.isLoadingResults = false;
      }, error => {
        console.log(error);
        this.isLoadingResults = false;
      })
  }

  deleteTask(id: number) {
    this.isLoadingResults = true;
    this.taskService.deleteTask(id)
      .subscribe(response => {
        console.log(response);
        this.isLoadingResults = false;
        this.router.navigate(['/tasks']);
      }, error => {
        console.log(error);
        this.isLoadingResults = false;
      })
  }
}
