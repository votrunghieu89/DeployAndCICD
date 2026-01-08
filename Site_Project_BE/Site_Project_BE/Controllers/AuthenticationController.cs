using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Site_Project_BE.DTOs;
using Site_Project_BE.Service;

namespace Site_Project_BE.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : Controller
    {
        private readonly AuthenticationService _authenticationService;
        public AuthenticationController(AuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var result = await _authenticationService.Login(loginDTO);
            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }
            return StatusCode(result.StatusCode, result.Data);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            var result = await _authenticationService.Register(registerDTO);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new
                {
                    message = result.Error
                });
            }
            return StatusCode(result.StatusCode, result.Data);
        }
    }
}
