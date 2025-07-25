using System;
using MediNest.DAL;
using MediNest.Helpers;
using MediNest.Modals;
using MediNest.Modals.Enums;
using MediNest.Models;
using MediNest.Models.DbModels;
using MediNest.Models.DTOs;

namespace MediNest.BLL;

public class HospitalBLL(GenericBLL genericBLL, HospitalDAL hospitalDAL)
{
    GenericBLL _genericBLL = genericBLL;
    HospitalDAL _hospitalDAL = hospitalDAL;

    public async Task<ResponseModel<HospitalDTO>> CreateNewHospital(NewHospitalDTO newHospitalDTO)
    {
        LoginDbModel loginDbModel = new LoginDbModel
        {
            Username = newHospitalDTO.Username,
            Password = SecurityHelper.HashPassword(newHospitalDTO.Password ?? throw new ArgumentNullException("Password is required.")),
            RoleId = (int)RoleEnum.HOSPITAL
        };

        await _genericBLL.Insert(loginDbModel);

        HospitalDbModel hospitalDbModel = new HospitalDbModel
        {
            LoginId = loginDbModel.Id,
            Name = newHospitalDTO.Name,
            Phone = newHospitalDTO.Phone,
            Email = newHospitalDTO.Email,
            Address = newHospitalDTO.Address,
            Website = newHospitalDTO.Website,
            PAN = newHospitalDTO.PAN,
        };

        await _genericBLL.Insert(hospitalDbModel);

        HospitalDTO hospitalDTO = new HospitalDTO
        {
            Id = hospitalDbModel.Id,
            Name = hospitalDbModel.Name,
            Phone = hospitalDbModel.Phone,
            Email = hospitalDbModel.Email,
            Address = hospitalDbModel.Address,
            Website = hospitalDbModel.Website,
            PAN = hospitalDbModel.PAN
        };


        return new ResponseModel<HospitalDTO>
        {
            Status = "Success",
            Message = "Added successfully.",
            Data = hospitalDTO
        };
    }

    public async Task<ResponseModel<List<ListHospitalDTO>>> GetHospitals(DataParamDTO? param)
    {

        ResponseModel<List<ListHospitalDTO>> hospitals = await _hospitalDAL.GetHospitals(param);

        return hospitals;
    }

    public async Task<ResponseModel<HospitalDTO>> GetHospital(string sid)
    {
        int.TryParse(sid, out int id);
        ResponseModel<HospitalDTO> hospital = await _hospitalDAL.GetHospital(id);

        return hospital;
    }

}
