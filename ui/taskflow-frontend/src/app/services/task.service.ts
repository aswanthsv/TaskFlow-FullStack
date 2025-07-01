import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem } from '../models/task-item.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7244/api/Task';

  constructor(private http: HttpClient) {}

  // ✅ 1. Get all tasks
  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  // ✅ 2. Create task
 createTask(dto: { title: string; description: string; dueDate?: string }): Observable<any> {
  return this.http.post(this.apiUrl, dto);
}


  // ✅ 3. Get task by ID
  getTaskById(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
  }

  // ✅ 4. Update task
  updateTask(id: number, task: TaskItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  // ✅ 5. Delete task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
