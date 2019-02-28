import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.tasks = this.taskService.getTasks();
  }

  deleteEmployee(id: number) {
    this.taskService.deleteTask(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
