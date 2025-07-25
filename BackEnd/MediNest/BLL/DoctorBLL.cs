using System;
using MediNest.DAL;
using MediNest.Helpers;
using MediNest.Modals;
using MediNest.Modals.Enums;
using MediNest.Models;
using MediNest.Models.DbModels;
using MediNest.Models.DTOs;

namespace MediNest.BLL;

public class DoctorBLL(GenericBLL genericBLL, DoctorDAL doctorDAL)
{
    GenericBLL _genericBLL = genericBLL;
    DoctorDAL _doctorDAL = doctorDAL;

    public async Task<ResponseModel<DoctorDTO>> CreateNewDoctor(NewDoctorDTO newDoctorDTO)
    {
        LoginDbModel loginDbModel = new LoginDbModel
        {
            Username = newDoctorDTO.Username,
            Password = SecurityHelper.HashPassword(newDoctorDTO.Password ?? throw new ArgumentNullException("Password is required.")),
            RoleId = (int)RoleEnum.DOCTOR
        };

        await _genericBLL.Insert(loginDbModel);

        DoctorDbModel doctorDbModel = new DoctorDbModel
        {
            LoginId = loginDbModel.Id,
            Name = newDoctorDTO.Name,
            Gender = newDoctorDTO.Gender,
            Phone = newDoctorDTO.Phone,
            Email = newDoctorDTO.Email,
            Address = newDoctorDTO.Address,
            RegistrationNo = newDoctorDTO.RegistrationNo,
            Qualification = newDoctorDTO.Qualification
        };

        await _genericBLL.Insert(doctorDbModel);

        DoctorDTO doctorDTO = new DoctorDTO
        {
            Id = doctorDbModel.Id,
            Name = doctorDbModel.Name,
            Gender = doctorDbModel.Gender,
            Phone = doctorDbModel.Phone,
            Email = doctorDbModel.Email,
            Address = doctorDbModel.Address,
            RegistrationNo = doctorDbModel.RegistrationNo,
            Qualification = doctorDbModel.Qualification
        };


        return new ResponseModel<DoctorDTO>
        {
            Status = "Success",
            Message = "Added successfully.",
            Data = doctorDTO
        };
    }

    public async Task<ResponseModel<List<ListDoctorDTO>>> GetDoctors(DataParamDTO? param)
    {

        ResponseModel<List<ListDoctorDTO>> doctors = await _doctorDAL.GetDoctors(param);

        return doctors;
    }

    public async Task<ResponseModel<DoctorDTO>> GetDoctor(string sid)
    {
        int.TryParse(sid, out int id);
        ResponseModel<DoctorDTO> doctor = await _doctorDAL.GetDoctor(id);

        return doctor;
    }

}
