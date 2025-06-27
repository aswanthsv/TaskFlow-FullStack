using Microsoft.EntityFrameworkCore;
using TaskFlow.Models;

namespace TaskFlow.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options) { }

        public DbSet<User> Users=> Set<User>();
        public DbSet<TaskItem> TaskItems => Set<TaskItem>();
    }
}
