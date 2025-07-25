using MediNest.BLL;
using MediNest.Models.DTOs;
using MediNest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediNest.Modals;

namespace MediNest.Controllers
{
    [Route("api/identity")]
    [ApiController]
    public class LoginController(IdentityBLL ideneityBLL) : ControllerBase
    {
        private IdentityBLL _ideneityBLL = ideneityBLL;

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            UserProfileDTO userProfileDTO = await _ideneityBLL.Login(loginDTO);
            return Ok(new ResponseModel<UserProfileDTO>
            {
                Status = "Success",
                Message = "Logged in successfully.",
                Data = userProfileDTO
            });
        }
    }
}
