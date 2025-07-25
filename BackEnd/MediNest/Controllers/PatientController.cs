using MediNest.BLL;
using MediNest.Models.DTOs;
using MediNest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediNest.Modals;

namespace MediNest.Controllers
{
    [Route("api/patient")]
    [ApiController]
    public class PatientController(GenericBLL genericBLL, PatientBLL patientBLL) : ControllerBase
    {
        private GenericBLL _genericBLL = genericBLL;
        private PatientBLL _patientBLL = patientBLL;

        [HttpPost("register")]
        public async Task<IActionResult> Register(NewPatientDTO newPatientDTO)
        {
            ResponseModel<PatientDTO> responseModel = await _patientBLL.CreateNewPatient(newPatientDTO);
            return Ok(responseModel);
        }

        [HttpGet("getPatients")]
        public async Task<IActionResult> GetPatients(DataParamDTO? paramDTO)
        {
            ResponseModel<List<ListPatientDTO>> responseModel = await _patientBLL.GetPatients(paramDTO);
            return Ok(responseModel);
        }

        [HttpGet("getPatient")]
        public async Task<IActionResult> GetPatient(string id)
        {
            ResponseModel<PatientDTO> responseModel = await _patientBLL.GetPatient(id);
            return Ok(responseModel);
        }
    }
}
