using MediNest.BLL;
using MediNest.Models.DTOs;
using MediNest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediNest.Modals;

namespace MediNest.Controllers
{
    [Route("api/ML")]
    [ApiController]
    public class MLController(GenericBLL genericBLL, MLBLL mlBLL) : ControllerBase
    {
        private GenericBLL _genericBLL = genericBLL;
        private MLBLL _mlBLL = mlBLL;

        [HttpPost("getDoctorSuggestion")]
        public async Task<IActionResult> GetDoctorSuggestion(SymptomData symptom)
        {
            string responseModel = await _mlBLL.GetDoctorSuggestion(symptom.SymptomText);
            return Ok(responseModel);
        }
    }
}
