using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.Data;
using TaskFlow.DTOs;
using TaskFlow.Interfaces;
using TaskFlow.Models;

namespace TaskFlow.API.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repository;

        public TaskService(ITaskRepository repository)
        {
            _repository = repository;
        }


        public async Task<TaskItemDto> CreateTask(int userId, CreateTaskDto dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                UserId = userId,
                DueDate = dto.DueDate

            };

            await _repository.AddAsync(task);
            await _repository.SaveChangesAsync();

            return MapToDto(task);
        }

        public async Task<bool> DeleteTask(int id, int userId)
        {
            var task = await _repository.GetByIdAsync(id, userId);
            if (task == null) return false;

            _repository.Delete(task);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<TaskItemDto?> GetTaskById(int id, int userId)
        {
            var task = await _repository.GetByIdAsync(id, userId);
            return task == null ? null : MapToDto(task);
        }


        public async Task<List<TaskItemDto>> GetTasksForUser(int userId)
        {
            var tasks = await _repository.GetAllByUserAsync(userId);
            return tasks.Select(MapToDto).ToList();
        }

        public async Task<bool> UpdateTask(int id, int userId, UpdateTaskDto dto)
        {
            var task = await _repository.GetByIdAsync(id, userId);
            if (task == null) return false;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.IsCompleted = dto.IsCompleted;
            task.DueDate= dto.DueDate;

            await _repository.SaveChangesAsync();
            return true;
        }

        private static TaskItemDto MapToDto(TaskItem task)
        {
            return new TaskItemDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                DueDate = task.DueDate



            };
        }



        public async Task<PagedResultDto<TaskItemDto>> GetTasksPaged(int userId, int pageNumber, int pageSize)
        {
            var (tasks, totalCount) = await _repository.GetTasksPagedAsync(userId, pageNumber, pageSize);

            return new PagedResultDto<TaskItemDto>
            {
                Items = tasks.Select(MapToDto).ToList(),
                TotalCount = totalCount,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };
        }



    }
}
