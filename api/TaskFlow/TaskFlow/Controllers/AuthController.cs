using Microsoft.AspNetCore.Mvc;
using TaskFlow.DTOs;
using TaskFlow.Interfaces;

namespace TaskFlow.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController:ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto request)
        {
            if (await _authService.UserExists(request.Username))
                return BadRequest("Username already exists");

            var user = await _authService.Register(request);
            return Ok(new { user.Id, user.Username });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto request)
        {
            var token = await _authService.Login(request);

            if (token == null)
                return Unauthorized("Invalid username or password");

            return Ok(new { token });
        }

    }
}
