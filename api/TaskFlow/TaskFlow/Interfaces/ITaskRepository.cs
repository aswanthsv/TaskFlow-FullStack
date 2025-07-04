﻿using TaskFlow.Models;

namespace TaskFlow.Interfaces
{
    public interface ITaskRepository
    {
        Task<TaskItem?> GetByIdAsync(int id, int userId);
        Task<List<TaskItem>> GetAllByUserAsync(int userId);
        Task AddAsync(TaskItem task);
        void Delete(TaskItem task);
        Task SaveChangesAsync();
        Task<(List<TaskItem> Tasks, int TotalCount)> GetTasksPagedAsync(int userId, int pageNumber, int pageSize);

    }
}
