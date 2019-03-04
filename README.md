# PRE-STEP 환경 설정
- 버젼 확인
```bash
node -v
v10.11.0
npm -v
6.4.1
```

- Angular cli 설치
```bash
npm install -g @angular/cli
```


# 1. 신규 Angular project

- 프로젝트 생성
```bash
ng new task-web
```

- 컴포넌트와 서비스 생성
```bash
ng g s task
ng g c create-task
ng g c task-details
ng g c task-list
ng g c task-edit
```

- 프로젝트 시작
```bash
ng serve
```
> intelliJ 에서 프로젝트 오픈 후 package.json 파일에서 오른쪽 클릭 후 'show npm scripts'를 선택
> npm script 를 바로 실행할 수 있는 탭이 추가로 생기고 여기서 start 를 할 수도 있다

- `http://localhost:4200` 에서 확인


- `app.module.ts` 파일에 아래와 같이 모듈 추가
```typescript
/* /src/app/app.module.ts */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatCommonModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule, MatProgressSpinnerModule, MatSelectModule, MatToolbarModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskEditComponent } from './task-edit/task-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    TaskListComponent,
    TaskEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

- Task 클래스 생성 : `/src/app` 하위에 `task.ts` 파일 생성

```typescript
/* /src/app/task.ts */
export class Task {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  startDate: Date;
  endDate: Date;
}
```


# 2. Angular Material

- Angular Material UI 설치
- 참고 : `https://material.angular.io/guide/getting-started`
```bash
npm install --save @angular/material @angular/cdk @angular/animations
```

- 메터리얼 컴포넌트 사용을 위해 `app.module.ts`에 아래 모듈들을 추가
> BrowserAnimationsModule
> FormsModule
> MatButtonModule
> MatCheckboxModule
> MatListModule
> MatIconModule
> MatCommonModule
> MatFormFieldModule
> MatOptionModule
> MatSelectModule
> MatInputModule
> MatToolbarModule
> MatDatepickerModule
> MatProgressSpinnerModule
> MatCardModule


- CSS 설정 추가 : `styles.css` 파일에 아래 내용 추가
```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

- 그외 제스쳐 동작관련 모듈 추가시
```bash
npm install --save hammerjs
```

- `src/main.ts` 에 추가
```typescript
import 'hammerjs'
```

- 메터리얼 폰트 아이콘을 사용시 : `index.html`에 추가
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```


- 메터리얼 컴포넌트 확인하기 : `app.component.html` 에 추가하여 확인
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
> Material Icon 참고 : `https://material.io/tools/icons/?style=outline`



# 3. 서비스

- `task.service.ts`
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

# 4. 라우팅
- 라우팅 설정을 추가할 모듈을 아래와 커맨드에서 실행하여 생성
```bash
$ ng g m app-routing --flat --module=app
CREATE src/app/app-routing.module.spec.ts (308 bytes)
CREATE src/app/app-routing.module.ts (194 bytes)
UPDATE src/app/app.module.ts (1045 bytes)
```

- 라우팅 설정 추가
```typescript
/* /src/app/app-routing.module.ts */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks-detail/:id', component: TaskDetailsComponent },
  { path: 'tasks-add', component: CreateTaskComponent },
  { path: 'tasks-edit/:id', component: TaskEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

- 메인 템플릿에 `router-outlet` 을 추가
```html
<!-- /src/app/app.component.html -->
<router-outlet></router-outlet>
```


# 5. 컴포넌트 개발
## 5.1 Task 목록 조회
- HTML 템플릿 작성
```html
<!-- /src/app/task-list/task-list.component.html -->
<div class="example-container mat-elevation-z8">
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>Tasks</span>
      <span class="toolbar-spacer"></span>
      <a mat-raised-button color="basic" routerLink="/tasks-add">추가</a>
    </mat-toolbar-row>
  </mat-toolbar>

  <mat-list>
    <mat-list-item *ngFor="let task of tasks | async" [routerLink]="['/tasks-detail/', task.id]">
      <mat-icon mat-list-icon>check_box_outline_blank</mat-icon>
      <h4 mat-line>[ {{ task.id }} ] {{ task.title }} </h4>
      <p mat-line> {{ task.creationDate | date:"yyyy-MM-dd" }} </p>
      <button mat-raised-button color="warn" (click)="deleteEmployee(task.id)">삭제</button>
      <mat-divider></mat-divider>
    </mat-list-item>
  </mat-list>
</div>
```

- Typescript 작성 
```typescript
/* /src/app/task-list/task-list.component.ts */
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
```

- CSS 적용
```css
/* /src/app/task-list/task-list.component.css */
.toolbar-icon {
  padding: 0 14px;
}

.toolbar-spacer {
  flex: 1 1 auto;
}

.example-container {
  position: relative;
  padding: 5px;
}
```

- `http://localhost:4200/tasks`에서 확인


## 5.2 Task 생성
- HTML 템플릿 작성
```html
<!-- /src/app/create-task/create-task.component.html -->
<div class="example-container mat-elevation-z8">
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>New Task</span>
      <span class="toolbar-spacer"></span>
      <a mat-raised-button color="basic" routerLink="/tasks"><mat-icon>list</mat-icon></a>
    </mat-toolbar-row>
  </mat-toolbar>

  <div class="example-loading-shade" *ngIf="isLoadingResults">
    <mat-spinner *ngIf="isLoadingResults"></mat-spinner>
  </div>

  <mat-card class="example-card">
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit(taskForm.value)" >
      <div class="create-task-container">
        <mat-form-field>
          <input matInput placeholder="Title" required formControlName="title">
        </mat-form-field>
        <mat-form-field>
          <input matInput placeholder="Description" required formControlName="description">
        </mat-form-field>
        <button mat-raised-button color="primary">Save</button>
      </div>
    </form>
  </mat-card>
</div>
```
- Typescript 작성
```typescript
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
```

- 스타일 추가
```css
.create-task-container {
  display: flex;
  flex-direction: column;
}

.create-task-container > * {
  width: 100%;
}
.create-task-button {
  padding: 0 14px;
}
.toolbar-icon {
  padding: 0 14px;
}
.toolbar-spacer {
  flex: 1 1 auto;
}
.example-container {
  position: relative;
  padding: 5px;
}
.example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}
.example-full-width {
  width: 100%;
}
.example-loading-shade {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-row {
  margin: 10px 0;
}

.mat-flat-button {
  margin: 5px;
}
```


## 5.3 Task 상세 보기
- HTML 템플릿 작성
```html
<!-- /src/app/task-detail/task-detail.component.html -->
<div class="example-container mat-elevation-z8">
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span>Task Detail</span>
      <span class="toolbar-spacer"></span>
      <a mat-raised-button color="basic" routerLink="/tasks"><mat-icon>list</mat-icon></a>
    </mat-toolbar-row>
  </mat-toolbar>

  <div class="example-loading-shade" *ngIf="isLoadingResults">
    <mat-spinner *ngIf="isLoadingResults"></mat-spinner>
  </div>

  <mat-card class="example-card" *ngIf="task">
    <mat-card-header>
      <mat-card-title><h2>{{ task.title }}</h2></mat-card-title>
      <mat-card-subtitle>{{ task.description }}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <dl>
        <dt>Start Date :</dt>
        <dd>{{ task.startDate | date:"yyyy-MM-dd" }}</dd>
        <dt>End Date :</dt>
        <dd>{{ task.endDate | date:"yyyy-MM-dd" }}</dd>
      </dl>
    </mat-card-content>
    <mat-card-actions>
      <a mat-flat-button color="primary" [routerLink]="['/tasks-edit/', task.id]"><mat-icon>edit</mat-icon></a>
      <a mat-flat-button color="warn" (click)="deleteTask(task.id)"><mat-icon>delete</mat-icon></a>
    </mat-card-actions>
  </mat-card>
</div>

```
- Typescript 작성
```typescript
/* /src/app/task-detail/task-detail.component.ts */
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
```
- 스타일 추가
```css
/* /src/app/task-detail/task-detail.component.css */
.example-container {
  position: relative;
  padding: 5px;
}

.example-loading-shade {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mat-flat-button {
  margin: 5px;
}

.toolbar-spacer {
  flex: 1 1 auto;
}

.toolbar-icon {
  padding: 0 14px;
}

```

## 5.4 Task 수정 하기
- HTML 템플릿 작성
```html
<!-- /src/app/task-edit/task-edit.component.html -->
<div class="example-container mat-elevation-z8">
  <div class="example-loading-shade"
       *ngIf="isLoadingResults">
    <mat-spinner *ngIf="isLoadingResults"></mat-spinner>
  </div>
  <div class="button-row">
    <a mat-flat-button color="primary" (click)="productDetails()"><mat-icon>backspace</mat-icon></a>
  </div>
  <mat-card class="example-card">
    <form [formGroup]="taskForm" (ngSubmit)="onFormSubmit(taskForm.value)">
      <mat-form-field class="example-full-width">
        <input matInput placeholder="Title" formControlName="title"
               [errorStateMatcher]="matcher">
        <mat-error>
          <span *ngIf="!taskForm.get('title').valid && taskForm.get('title').touched">Please enter Product Name</span>
        </mat-error>
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <input matInput placeholder="Description" formControlName="description"
               [errorStateMatcher]="matcher">
        <mat-error>
          <span *ngIf="!taskForm.get('description').valid && taskForm.get('description').touched">Please enter Product Description</span>
        </mat-error>
      </mat-form-field>
      <div class="button-row">
        <button type="submit" [disabled]="!taskForm.valid" mat-flat-button color="primary"><mat-icon>save</mat-icon></button>
      </div>
    </form>
  </mat-card>
</div>

```
- Typescript 작성
```typescript
/* /src/app/task-edit/task-edit.component.ts */
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

```
- 스타일 추가
```css
/* /src/app/task-edit/task-edit.component.css */
.example-container {
  position: relative;
  padding: 5px;
}

.example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.example-full-width {
  width: 100%;
}

.example-full-width:nth-last-child(1) {
  margin-bottom: 10px;
}

.button-row {
  margin: 10px 0;
}

.mat-flat-button {
  margin: 5px;
}

```


# Reference
- https://angular.io
- https://material.angular.io
- https://www.youtube.com/channel/UCNweZR_LiXP326Ga6NEkIEA/videos
- https://www.javaguides.net/2019/02/spring-boot-2-angular-7-crud-example-tutorial.html?m=1
- https://www.djamware.com/post/5bca67d780aca7466989441f/angular-7-tutorial-building-crud-web-application#ch4
