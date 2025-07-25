using MediNest.BLL;
using MediNest.Models.DTOs;
using MediNest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediNest.Modals;

namespace MediNest.Controllers
{
    [Route("api/hospital")]
    [ApiController]
    public class HospitalController(GenericBLL genericBLL, HospitalBLL hospitalBLL) : ControllerBase
    {
        private GenericBLL _genericBLL = genericBLL;
        private HospitalBLL _hospitalBLL = hospitalBLL;

        [HttpPost("register")]
        public async Task<IActionResult> Register(NewHospitalDTO newHospitalDTO)
        {
            ResponseModel<HospitalDTO> responseModel = await _hospitalBLL.CreateNewHospital(newHospitalDTO);
            return Ok(responseModel);
        }

        [HttpGet("getHospitals")]
        public async Task<IActionResult> GetHospitals(DataParamDTO? paramDTO)
        {
            ResponseModel<List<ListHospitalDTO>> responseModel = await _hospitalBLL.GetHospitals(paramDTO);
            return Ok(responseModel);
        }

        [HttpGet("getHospital")]
        public async Task<IActionResult> GetHospital(string id)
        {
            ResponseModel<HospitalDTO> responseModel = await _hospitalBLL.GetHospital(id);
            return Ok(responseModel);
        }
    }
}
