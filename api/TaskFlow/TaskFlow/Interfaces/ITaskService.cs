using TaskFlow.DTOs;

namespace TaskFlow.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskItemDto>> GetTasksForUser(int userId);
        Task<TaskItemDto?> GetTaskById(int id, int userId);
        Task<TaskItemDto> CreateTask(int userId, CreateTaskDto dto);
        Task<bool> UpdateTask(int id, int userId,UpdateTaskDto dto);
        Task<bool> DeleteTask(int id, int userId);
        Task<PagedResultDto<TaskItemDto>> GetTasksPaged(int userId, int pageNumber, int pageSize);
    }
}
