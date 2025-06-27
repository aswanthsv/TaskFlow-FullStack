import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TaskItem } from 'src/app/models/task-item.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit {
  taskId!: number;
  task: TaskItem = { id: 0, title: '', description: '', isCompleted: false };
  error: string = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (res) => this.task = res,
      error: () => this.error = 'Could not load task'
    });
  }

  updateTask() {
    this.taskService.updateTask(this.taskId, this.task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => this.error = 'Failed to update task'
    });
  }
}
