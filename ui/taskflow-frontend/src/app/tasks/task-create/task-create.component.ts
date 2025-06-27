import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html'
})
export class TaskCreateComponent {
  title: string = '';
  description: string = '';
  error: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

 createTask() {
    if (this.title.length < 5 || !this.description) {
      this.error = 'Please fill out the form correctly';
      return;
    }

    this.taskService.createTask({ title: this.title, description: this.description }).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => this.error = 'Failed to create task'
    });
  }
}
