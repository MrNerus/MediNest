using System;
using System.Reflection;
using System.Text;
using Dapper;
using MediNest.Helpers;
using MediNest.Modals;
using MediNest.Models;
using MediNest.Models.DbModels;
using MediNest.Models.DTOs;
using Npgsql;

namespace MediNest.DAL;

public class IdentityDAL(IConfiguration configuration)
{
    private IConfiguration _configuration = configuration;
    private string _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new Exception("Who is gonna setup the DBConnection? Me?");

    public async Task<UserProfile> GetUserProfile(string username)
    {
        string query = @$"SELECT l.""Id"" as ""LoginId"", l.""Username"", l.""Password"", l.""RoleId"", r.""Role"" from ""Login"" l join ""Role"" r on l.""RoleId"" = r.""Id"" where l.""Username"" = @Username";
        using NpgsqlConnection conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        UserProfile? user = await conn.QueryFirstOrDefaultAsync<UserProfile>(query, new { username = username });
        if (user == null) throw new Exception("User not found");


        return user;
    }
}
