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

public class HospitalDAL(IConfiguration configuration)
{
    private IConfiguration _configuration = configuration;
    private string _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new Exception("Who is gonna setup the DBConnection? Me?");

    public async Task<ResponseModel<List<ListHospitalDTO>>> GetHospitals(DataParamDTO? param)
    {
        DbQuery query = BuildHospitalQuery(param);

        if (string.IsNullOrEmpty(query.query))
            throw new SystemException("No query generated for getting Hospital List.");

        using NpgsqlConnection conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        List<ListHospitalDTO> hospitalDTO = [.. await conn.QueryAsync<ListHospitalDTO>(query.query, query.parameters)];

        return new ResponseModel<List<ListHospitalDTO>>
        {
            Status = "Success",
            Message = "Fetched successfully.",
            Data = hospitalDTO
        };
        
    }

    public async Task<ResponseModel<HospitalDTO>> GetHospital(int id)
    {
        string queryBuilder = @$"
            SELECT l.""Username"", h.""Id"", h.""Name"", h.""Phone"", 
                h.""Email"", h.""Address"", h.""PAN"", h.""Website""
            FROM ""Hospital"" h
            JOIN ""Login"" l ON h.""LoginId"" = l.""Id""
            WHERE h.""Id"" = @id
        ";

        using NpgsqlConnection conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        HospitalDTO? hospital = await conn.QueryFirstOrDefaultAsync<HospitalDTO>(queryBuilder, new { id = id });
        if (hospital == null) throw new Exception("Hospital not found");


        return new ResponseModel<HospitalDTO>
        {
            Status = "Success",
            Message = "Fetched successfully.",
            Data = hospital
        };
    }

    public static DbQuery BuildHospitalQuery(DataParamDTO? param)
    {
        Dictionary<string, object?> parameters = new Dictionary<string, object?>();

        var queryBuilder = new StringBuilder();
        queryBuilder.Append(@$"
            SELECT l.""Username"", h.""Id"", h.""Name"", h.""Phone"", h.""Email"", h.""Address"", h.""PAN"", h.""Website""
            FROM ""Hospital"" h
            JOIN ""Login"" l ON h.""LoginId"" = l.""Id""
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

                if (!SecurityHelper.IsValidProperty<ListHospitalDTO>(filter.Field))
                    continue;

                string paramName = $"@p{index++}";

                switch (filter.Operator?.ToLower())
                {
                    case "like":
                        filters.Add($@"h.""{filter.Field}"" ILIKE {paramName}");
                        parameters[paramName] = $"%{filter.Value}%";
                        break;
                    case "=":
                    case ">":
                    case "<":
                    case ">=":
                    case "<=":
                        filters.Add($@"h.""{filter.Field}"" {filter.Operator} {paramName}");
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
                orders.Add($@"h.""{ord.Field}"" {orderDir}");
            }

            queryBuilder.Append(" ORDER BY " + string.Join(", ", orders));
        }
        else
        {
            queryBuilder.Append(" ORDER BY h.\"Id\" DESC "); // Default order
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
