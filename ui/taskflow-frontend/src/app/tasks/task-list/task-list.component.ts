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
  sortOption: string='';
  completedCount = 0;
  pendingCount = 0;
  


  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
   this.loadTasks();
  }

  loadTasks() {
  this.taskService.getTasks().subscribe({
    next: (res) => {
      this.tasks = res;
      this.filteredTasks = res; // ✅ Show all on load
      this.calculateSummary();
    },
    error: () => this.error = 'Failed to load tasks'
  });
}
calculateSummary() {
  this.completedCount=this.tasks.filter(t=>t.isCompleted).length;
  this.pendingCount=this.tasks.length- this.completedCount;
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
  this.sortTasks();
}

sortTasks():void {
  switch(this.sortOption){
    case 'titleAsc':
      this.filteredTasks.sort((a,b)=>a.title.localeCompare(b.title));
      break;

      case 'titleDesc':
        this.filteredTasks.sort((a,b)=>b.title.localeCompare(a.title));
        break;

        case 'completedFirst':
          this.filteredTasks.sort((a,b)=>Number(b.isCompleted)-Number(a.isCompleted));
          break;
          
          case 'pendingFirst':
            this.filteredTasks.sort((a,b)=>Number(a.isCompleted)-Number(b.isCompleted));
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
isOverdue(date?: string | Date | null, isCompleted: boolean = false): boolean {
  if (!date || isCompleted) return false;
  return new Date(date) < new Date();
}



}
