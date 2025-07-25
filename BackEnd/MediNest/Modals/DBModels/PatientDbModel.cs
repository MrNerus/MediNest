using System;
using MediNest.Modals.Interface;

namespace MediNest.Models.DbModels;

public class PatientDbModel : DbModel, IDbModel
{
    public int? LoginId { get; set; }
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public void Stage()
    {
        DB_TableName = "Patient";
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
