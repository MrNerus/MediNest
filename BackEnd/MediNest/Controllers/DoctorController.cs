using MediNest.BLL;
using MediNest.Models.DTOs;
using MediNest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediNest.Modals;

namespace MediNest.Controllers
{
    [Route("api/doctor")]
    [ApiController]
    public class DoctorController(GenericBLL genericBLL, DoctorBLL doctorBLL) : ControllerBase
    {
        private GenericBLL _genericBLL = genericBLL;
        private DoctorBLL _doctorBLL = doctorBLL;

        [HttpPost("register")]
        public async Task<IActionResult> Register(NewDoctorDTO newDoctorDTO)
        {
            ResponseModel<DoctorDTO> responseModel = await _doctorBLL.CreateNewDoctor(newDoctorDTO);
            return Ok(responseModel);
        }

        [HttpGet("getDoctors")]
        public async Task<IActionResult> GetDoctors(DataParamDTO? paramDTO)
        {
            ResponseModel<List<ListDoctorDTO>> responseModel = await _doctorBLL.GetDoctors(paramDTO);
            return Ok(responseModel);
        }
    }
}
