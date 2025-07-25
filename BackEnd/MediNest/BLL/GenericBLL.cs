using System;
using Dapper;
using MediNest.Models.DTOs;
using MediNest.Modals.Interface;
using MediNest.Models;
using Npgsql;
using MediNest.Models.DbModels;

namespace MediNest.BLL;

public class GenericBLL(IConfiguration configuration)
{
    private IConfiguration _configuration = configuration;
    private string _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new Exception("Who is gonna setup the DBConnection? Me?");

    public async Task<ResponseModel<IDbModel>> Insert(IDbModel model)
    {
            
        model.StageForNew();
        DbQuery query = model.GetInsertQuery();
        if (string.IsNullOrEmpty(query.query))
            throw new SystemException("No query generated for adding donation domain.");

        using NpgsqlConnection conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();
        using NpgsqlTransaction tran = (NpgsqlTransaction)await conn.BeginTransactionAsync();
        int? id = -1;
        try
        {

            id = await conn.QueryFirstOrDefaultAsync<int?>(query.query, query.parameters, transaction: tran);

            await tran.CommitAsync();

        }
        catch (Exception ex)
        {
            throw;
        }
        finally
        {
            await conn.CloseAsync();
        }
        model.Id = id;

        return new ResponseModel<IDbModel>
        {
            Status = "Success",
            Message = "Added successfully.",
            Data = model
        };
    }
}
