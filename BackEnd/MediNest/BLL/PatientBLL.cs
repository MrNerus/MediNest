using System;
using MediNest.DAL;
using MediNest.Helpers;
using MediNest.Modals;
using MediNest.Modals.Enums;
using MediNest.Models;
using MediNest.Models.DbModels;
using MediNest.Models.DTOs;

namespace MediNest.BLL;

public class PatientBLL(GenericBLL genericBLL, PatientDAL patientDAL)
{
    GenericBLL _genericBLL = genericBLL;
    PatientDAL _patientDAL = patientDAL;

    public async Task<ResponseModel<PatientDTO>> CreateNewPatient(NewPatientDTO newPatientDTO)
    {
        LoginDbModel loginDbModel = new LoginDbModel
        {
            Username = newPatientDTO.Username,
            Password = SecurityHelper.HashPassword(newPatientDTO.Password ?? throw new ArgumentNullException("Password is required.")),
            RoleId = (int)RoleEnum.PATIENT
        };

        await _genericBLL.Insert(loginDbModel);

        PatientDbModel patientDbModel = new PatientDbModel
        {
            LoginId = loginDbModel.Id,
            Name = newPatientDTO.Name,
            Gender = newPatientDTO.Gender,
            Phone = newPatientDTO.Phone,
            Email = newPatientDTO.Email,
            Address = newPatientDTO.Address,

        };

        await _genericBLL.Insert(patientDbModel);

        PatientDTO patientDTO = new PatientDTO
        {
            Id = patientDbModel.Id,
            Name = patientDbModel.Name,
            Gender = patientDbModel.Gender,
            Phone = patientDbModel.Phone,
            Email = patientDbModel.Email,
            Address = patientDbModel.Address,
        };


        return new ResponseModel<PatientDTO>
        {
            Status = "Success",
            Message = "Added successfully.",
            Data = patientDTO
        };
    }

    public async Task<ResponseModel<List<ListPatientDTO>>> GetPatients(DataParamDTO? param)
    {
       
        ResponseModel<List<ListPatientDTO>> patients = await _patientDAL.GetPatients(param);

        return patients;
    }

    public async Task<ResponseModel<PatientDTO>> GetPatient(string sid)
    {
        int.TryParse(sid, out int id);
        ResponseModel<PatientDTO> patient = await _patientDAL.GetPatient(id);

        return patient;
    }

}
