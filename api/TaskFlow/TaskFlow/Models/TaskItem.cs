﻿namespace TaskFlow.Models
{
    public class TaskItem
    {
        public  int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public bool IsCompleted { get; set; } = false;

        public DateTime? DueDate { get; set; }
        public int UserId {  get; set; }
        public User? User { get; set; }
    }
}
