import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.baseUrl + '/' + id);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(this.baseUrl + '/' + id);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
}
