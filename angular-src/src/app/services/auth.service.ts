import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface data {
  success: boolean;
  msg: string;
  task: object;
  tasks: [any];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  addNewTaskRequest(obj) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http
      .post<data>('http://localhost:3000/todo', obj, { headers: headers })
      .pipe(map((res) => res));
  }

  getAllTasksRequest() {
    return this.http
      .get<data>('http://localhost:3000/todo')
      .pipe(map((res) => res));
  }

  deleteTaskRequest(obj) {
    return this.http
      .delete<data>('http://localhost:3000/todo', { params: obj })
      .pipe(map((res) => res));
  }

  markTaskAsCompleted(obj) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http
      .patch<data>('http://localhost:3000/todo', obj, { headers: headers })
      .pipe(map((res) => res));
  }
}
