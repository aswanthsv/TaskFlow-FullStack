import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskItem } from 'src/app/models/task-item.model'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => this.tasks = res,
      error: (err) => console.error('Error fetching tasks', err)
    });
  }
}
