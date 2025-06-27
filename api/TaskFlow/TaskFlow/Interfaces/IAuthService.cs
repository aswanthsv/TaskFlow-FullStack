using TaskFlow.DTOs;
using TaskFlow.Models;

namespace TaskFlow.Interfaces
{
    public interface IAuthService
    {
        Task<User> Register(UserRegisterDto request);
        Task<bool> UserExists(string username);
        Task<string?> Login(UserLoginDto request); 
    }
}
