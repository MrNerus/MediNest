using System;
using MediNest.Modals.Interface;
using MediNest.Models.DbModels;

namespace MediNest;

public class LoginDbModel: DbModel, IDbModel
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public int? RoleId { get; set; }
    public void Stage()
    {
        DB_TableName = "Login";
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
