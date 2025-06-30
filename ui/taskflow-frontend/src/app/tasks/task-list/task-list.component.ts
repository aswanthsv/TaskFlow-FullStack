import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskItem } from 'src/app/models/task-item.model'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  filteredTasks: TaskItem[]=[];
  searchText: string ='';
  error: string='';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
   this.loadTasks();
  }

  loadTasks() {
  this.taskService.getTasks().subscribe({
    next: (res) => {
      this.tasks = res;
      this.filteredTasks = res; // ✅ Show all on load
    },
    error: () => this.error = 'Failed to load tasks'
  });
}
 applyFilter() {
  const text = this.searchText.trim().toLowerCase();

  if (!text) {
    this.filteredTasks = this.tasks;
  } else {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(text)
    );
  }
}

  deleteTask(id: number) {
  if (confirm('Are you sure you want to delete this task?')) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => this.error = 'Failed to delete task'
    });
  }
}

}
