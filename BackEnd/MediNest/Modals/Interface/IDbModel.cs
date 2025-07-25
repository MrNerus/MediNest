using System;
using MediNest.Models.DbModels;

namespace MediNest.Modals.Interface;

public interface IDbModel
{
    public DbQuery GetInsertQuery();
    public DbQuery GetUpdateQuery();
    public DbQuery GetSelectQuery();
    public void Stage();
    public void StageForUpdate();
    public void StageForNew();
    int? Id { get; set; }
    DateTime? CreatedTs { get; set; }
    DateTime? UpdatedTs { get; set; }
    string? DB_TableName { get; set; }
    List<string>? DB_Key  { get; set; }
    List<string>? DB_Ignore  { get; set; }
}
