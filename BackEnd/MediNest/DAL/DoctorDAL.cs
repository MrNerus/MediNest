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

public class DoctorDAL(IConfiguration configuration)
{
    private IConfiguration _configuration = configuration;
    private string _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new Exception("Who is gonna setup the DBConnection? Me?");

    public async Task<ResponseModel<List<ListDoctorDTO>>> GetDoctors(DataParamDTO? param)
    {
        DbQuery query = BuildDoctorQuery(param);

        if (string.IsNullOrEmpty(query.query))
            throw new SystemException("No query generated for getting Doctor List.");

        using NpgsqlConnection conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        List<ListDoctorDTO> doctorDTO = [.. await conn.QueryAsync<ListDoctorDTO>(query.query, query.parameters)];

        return new ResponseModel<List<ListDoctorDTO>>
        {
            Status = "Success",
            Message = "Fetched successfully.",
            Data = doctorDTO
        };
        
    }

    public static DbQuery BuildDoctorQuery(DataParamDTO? param)
    {
        Dictionary<string, object?> parameters = new Dictionary<string, object?>();

        var queryBuilder = new StringBuilder();
        queryBuilder.Append(@$"
            SELECT l.""Username"", d.""Id"", d.""Name"", d.""Gender"", d.""Phone"", 
                d.""Email"", d.""Address"", d.""RegistrationNo"", d.""Qualification"", 0 AS ""Reputation""
            FROM ""Doctor"" d
            JOIN ""Login"" l ON d.""LoginId"" = l.""Id""
        ");

        // WHERE Clause
        if (param?.Filter != null && param.Filter.Any())
        {
            queryBuilder.Append(" WHERE 1=1 ");
            var filters = new List<string>();
            int index = 0;

            foreach (var filter in param.Filter)
            {
                if (string.IsNullOrWhiteSpace(filter.Field) || string.IsNullOrWhiteSpace(filter.Operator))
                    continue;

                if (!SecurityHelper.IsValidProperty<ListDoctorDTO>(filter.Field))
                    continue;

                string paramName = $"@p{index++}";

                switch (filter.Operator?.ToLower())
                {
                    case "like":
                        filters.Add($@"d.""{filter.Field}"" ILIKE {paramName}");
                        parameters[paramName] = $"%{filter.Value}%";
                        break;
                    case "=":
                    case ">":
                    case "<":
                    case ">=":
                    case "<=":
                        filters.Add($@"d.""{filter.Field}"" {filter.Operator} {paramName}");
                        parameters[paramName] = filter.Value!;
                        break;
                    default:
                        // unsupported operators can be skipped
                        break;
                }
            }

            if (filters.Any())
            {
                queryBuilder.Append(string.Join(" AND ", filters));
            }
        }

        // ORDER BY Clause
        if (param?.Order != null && param.Order.Any())
        {
            var orders = new List<string>();
            foreach (var ord in param.Order)
            {
                string orderDir = ord.Order?.ToUpper() == "DESC" ? "DESC" : "ASC";
                orders.Add($@"d.""{ord.Field}"" {orderDir}");
            }

            queryBuilder.Append(" ORDER BY " + string.Join(", ", orders));
        }
        else
        {
            queryBuilder.Append(" ORDER BY d.\"Id\" DESC "); // Default order
        }

        // Pagination
        int limit = param?.PageInfo?.RowsPerPage ?? 20;
        int offset = ((param?.PageInfo?.CurrentPage ?? 1) - 1) * limit;

        queryBuilder.Append($" LIMIT {limit} OFFSET {offset} ");

        DbQuery dbQuery = new DbQuery
        {
            query = queryBuilder.ToString(),
            parameters = parameters
        };

        return dbQuery;
    }
    
}
