using System;
using MediNest.Modals.Interface;

namespace MediNest.Models.DbModels;

public class DoctorDbModel : DbModel, IDbModel
{
    public int? LoginId { get; set; }
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? RegistrationNo { get; set; }
    public string? Qualification { get; set; }

    public void Stage()
    {
        DB_TableName = "Doctor";
        DB_Key = new List<string> { "Id" };
        DB_Ignore = new List<string> { "DB_TableName", "DB_Key", "DB_Ignore" };
    }
    public void StageForUpdate()
    {
        UpdatedTs = DateTime.Now;
        Stage();
    }
    
    public void StageForNew()
    {
        CreatedTs = DateTime.Now;
        UpdatedTs = CreatedTs;
        Stage();
    }

}
