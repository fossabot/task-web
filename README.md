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
ng g s tasks
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



# 서비스

tasks.service.ts
```typescript
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
```
