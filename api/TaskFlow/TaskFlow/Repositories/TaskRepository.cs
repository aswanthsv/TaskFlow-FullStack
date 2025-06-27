using Microsoft.EntityFrameworkCore;
using TaskFlow.Data;
using TaskFlow.Interfaces;
using TaskFlow.Models;

namespace TaskFlow.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItem?> GetByIdAsync(int id, int userId)
        {
            return await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task<List<TaskItem>> GetAllByUserAsync(int userId)
        {
            return await _context.TaskItems.Where(t => t.UserId == userId).ToListAsync();
        }

        public async Task AddAsync(TaskItem task)
        {
            await _context.TaskItems.AddAsync(task);
        }

        public void Delete(TaskItem task)
        {
            _context.TaskItems.Remove(task);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
