import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = '/tasks';

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<Object> {
    return this.http.get('${this.baseUrl}/${id}');
  }

  createTask(task: Object): Observable<Object> {
    return this.http.post('${this.baseUrl}', task);
  }

  updateTask(task: Object): Observable<Object> {
    return this.http.put('${this.baseUrl}', task);
  }

  deleteTask(id: number): Observable<Object> {
    return this.http.delete('${this.baseUrl}/${id}');
  }

  getTasks(): Observable<any> {
    return this.http.get('${this.baseUrl}');
  }
}
