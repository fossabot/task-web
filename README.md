# 환경 설정
버젼 확인
```bash
node -v
v10.11.0
npm -v
6.4.1
```

Angular cli 설치
```bash
npm install -g @angular/cli
```


# 신규 Angular project

프로젝트 생성
```bash
ng new task-web
```

컴포넌트와 서비스 생성
```bash
ng g s task
ng g c create-task
ng g c task-details
ng g c task-list
```




프로젝트 시작
```bash
ng serve
```
intelliJ 에서 프로젝트 오픈 후 package.json 파일에서 오른쪽 클릭 후 'show npm scripts'를 선택
npm script 를 바로 실행할 수 있는 탭이 추가로 생기고 여기서 start 를 할 수도 있다

http://localhost:4200 에서 확인


app.module.ts 파일에 HttpClientModule 모듈 추가
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Task 클래스 생성 : /src/app 하위에 task.ts 파일 생성

```typescript
export class Task {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  startDate: Date;
  endDate: Date;
}
```


# Angular Material

Angular Material UI 설치
https://material.angular.io/guide/getting-started
```bash
npm install --save @angular/material @angular/cdk @angular/animations
```

애니메이션 설정 : app.module.ts 파일에 BrowserAnimationsModule 모듈 추가

UI 컴포넌트 모듈 추가 : ex) MatButtonModule, MatCheckboxModule

CSS 설정 추가 : styles.css 파일에 아래 내용 추가
```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

그외 제스쳐 동작관련 모듈 추가시
```bash
npm install --save hammerjs
```

src/main.ts 에 추가
```typescript
import 'hammerjs'
```

메터리얼 폰트 아이콘을 사용시 : index.html에 추가
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```


메터리얼 컴포넌트 확인하기 : app.component.html 에 추가하여 확인
```html
<h3>Raised Buttons</h3>
<div class="example-button-row">
  <button mat-raised-button>Basic</button>
  <button mat-raised-button color="primary">Primary</button>
  <button mat-raised-button color="accent">Accent</button>
  <button mat-raised-button color="warn">Warn</button>
  <button mat-raised-button disabled>Disabled</button>
  <a mat-raised-button routerLink=".">Link</a>
</div>
```
https://material.io/tools/icons/?style=outline


# 서비스

task.service.ts
```typescript
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
```

리스트 html 추가
```
<mat-list>
  <h3 mat-subheader>Tasks</h3>
  <mat-list-item *ngFor="let task of tasks | async">
    <mat-icon mat-list-icon>list_alt</mat-icon>
    <h4 mat-line>[ {{ task.id }} ] {{ task.title }} </h4>
    <p mat-line> {{ task.creationDate | date:"MM/dd/yy" }} </p>
    <mat-divider></mat-divider>
  </mat-list-item>
</mat-list>
```

UI 컴포넌트 모듈 추가 : app.module.ts 에 MatListModule, MatIconModule 추가
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

리스트 html 에 삭제버튼 추가
```html
<mat-list>
  <h3 mat-subheader>Tasks</h3>
  <mat-list-item *ngFor="let task of tasks | async">
    <mat-icon mat-list-icon>list_alt</mat-icon>
    <h4 mat-line>[ {{ task.id }} ] {{ task.title }} </h4>
    <p mat-line> {{ task.creationDate | date:"yyyy-MM-dd" }} </p>
    <button mat-raised-button color="warn" (click)="deleteEmployee(task.id)">삭제</button>
    <mat-divider></mat-divider>
  </mat-list-item>
</mat-list>
```

아직 리스트를 볼 수 있는 path 경로가 없으므로 임시로 확인하려면 app.component.html 에 아래 태그를 추가해서 확인해본다
```html
<app-task-list></app-task-list>
```

# 라우팅 추가
```bash
$ ng g m app-routing --flat --module=app
CREATE src/app/app-routing.module.spec.ts (308 bytes)
CREATE src/app/app-routing.module.ts (194 bytes)
UPDATE src/app/app.module.ts (1045 bytes)
```

라우팅 설정 추가 : app-routing.module.ts
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

app.component.html 에 추가
```
<router-outlet></router-outlet>
```
