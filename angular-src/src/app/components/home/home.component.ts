import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  task_name: string;
  tasks = [];
  done_tasks = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.refreshTasksList();
  }

  refreshTasksList() {
    // Subscribe to a GET Request
    this.tasks = [];
    this.done_tasks = [];
    this.authService.getAllTasksRequest().subscribe((data) => {
      if (data.success) {
        let tasks = data.tasks;
        tasks.forEach((task) => {
          if (task.completed) this.done_tasks.push(task);
          else this.tasks.push(task);
        });
        console.log(this.tasks);
        console.log(this.done_tasks);
      }
    });
  }

  addNewTask() {
    console.log(this.task_name);
    const obj = {
      task_name: this.task_name,
    };
    // HTTP Request - POST
    this.authService.addNewTaskRequest(obj).subscribe((data) => {
      if (data.success) {
        console.log('Task Added');
        this.refreshTasksList();
      } else {
        console.log('Task Not Added.');
        console.log(data.msg);
      }
    });
  }

  deleteTask(task) {
    console.log(task);
    // HTTP: Delete
    this.authService.deleteTaskRequest(task).subscribe((data) => {
      if (data.success) {
        this.refreshTasksList();
      } else {
        console.log(data.msg);
      }
    });
  }

  markTaskAsComplete(task) {
    console.log(task);
    this.authService.markTaskAsCompleted(task).subscribe((data) => {
      if (data.success) {
        console.log('Completed');
        this.refreshTasksList();
      } else {
        console.log(data.msg);
      }
    });
  }
}
