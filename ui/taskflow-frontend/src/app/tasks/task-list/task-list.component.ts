import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskItem } from 'src/app/models/task-item.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  filteredTasks: TaskItem[] = [];
  searchText: string = '';
  error: string = '';
  sortOption: string = '';
  completedCount = 0;
  pendingCount = 0;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTaskSummary();
    this.loadPagedTasks();
  }

  loadTaskSummary() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res ?? []; // fallback if res is null
        this.calculateSummary();
      },
      error: () => {
        this.error = 'Failed to load task summary';
        this.tasks = []; // prevent undefined issues
      }
    });
  }

  loadPagedTasks() {
    this.taskService.getTasksPaged(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.filteredTasks = res.items ?? [];
        this.totalPages = res.totalPages ?? 1;
        this.currentPage = res.currentPage ?? 1;
        this.sortTasks();
      },
      error: () => {
        this.error = 'Error fetching paged tasks';
        this.filteredTasks = []; // prevent undefined issues
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPagedTasks();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPagedTasks();
    }
  }

  calculateSummary() {
    this.completedCount = this.tasks.filter(t => t.isCompleted).length;
    this.pendingCount = this.tasks.length - this.completedCount;
  }

  applyFilter() {
    const text = this.searchText.trim().toLowerCase();

    if (!text) {
      this.loadPagedTasks();
      return;
    }

    this.filteredTasks = this.filteredTasks.filter(task =>
      task.title.toLowerCase().includes(text)
    );

    this.sortTasks();
  }

  sortTasks(): void {
    switch (this.sortOption) {
      case 'titleAsc':
        this.filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        this.filteredTasks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'completedFirst':
        this.filteredTasks.sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted));
        break;
      case 'pendingFirst':
        this.filteredTasks.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
        break;
    }
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTaskSummary();
          this.loadPagedTasks();
        },
        error: () => this.error = 'Failed to delete task'
      });
    }
  }

  isOverdue(date?: string | Date | null, isCompleted: boolean = false): boolean {
    if (!date || isCompleted) return false;
    return new Date(date) < new Date();
  }
}
