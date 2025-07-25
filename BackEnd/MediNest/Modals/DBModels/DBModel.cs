using System;
using System.Reflection;
using System.Text;

namespace MediNest.Models.DbModels;

public class DbModel
{
    public int? Id { get; set; }
    public DateTime? CreatedTs { get; set; }
    public DateTime? UpdatedTs { get; set; }
    public string? DB_TableName { get; set; }
    public List<string>? DB_Key { get; set; }
    public List<string>? DB_Ignore { get; set; }

    public DbQuery GetInsertQuery()
    {
        if (DB_Key == null || DB_Key.Count == 0) throw new ArgumentException("DB_Key is required");

        var type = GetType();

        var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => !(DB_Ignore?.Contains(p.Name) == true) && !(DB_Key.Contains(p.Name) == true))
            .ToList();

        var query = new StringBuilder();
        query.Append($"INSERT INTO \"{DB_TableName}\" (");
        query.Append(string.Join(", ", properties.Select(p => $"\"{p.Name}\"")));
        query.Append(") VALUES (");
        query.Append(string.Join(", ", properties.Select(p => $"@{p.Name}")));
        query.Append(") RETURNING ");
        query.Append(string.Join(", ", DB_Key.Select(p => $"\"{p}\"")));


        Dictionary<string, object?>? parameters = properties.ToDictionary(
            prop => prop.Name,
            prop => prop.GetValue(this)
        );

        return new DbQuery
        {
            query = query.ToString(),
            parameters = parameters
        };

    }

    public DbQuery GetUpdateQuery()
    {
        if (DB_Key == null || DB_Key.Count == 0) throw new ArgumentException("DB_Key is required");

        var type = GetType();

        var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => !(DB_Ignore?.Contains(p.Name) == true) && !(DB_Key.Contains(p.Name) == true))
            .ToList();

        var query = new StringBuilder();
        query.Append($"UPDATE \"{DB_TableName}\" SET ");
        query.Append(string.Join(", ", properties.Select(p => $"\"{p.Name}\" = @{p.Name}")));
        query.Append(" WHERE ");
        query.Append(string.Join(" AND ", DB_Key.Select(p => $"\"{p}\" = @{p}")));
        query.Append(";");


        Dictionary<string, object?>? parameters = properties.ToDictionary(
            prop => prop.Name,
            prop => prop.GetValue(this)
        );

        return new DbQuery
        {
            query = query.ToString(),
            parameters = parameters
        };

    }

    public DbQuery GetSelectQuery()
    {
        if (DB_Key == null || DB_Key.Count == 0) throw new ArgumentException("DB_Key is required");

        var type = GetType();

        var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => !(DB_Ignore?.Contains(p.Name) == true) && !(DB_Key.Contains(p.Name) == true))
            .ToList();

        var query = new StringBuilder();
        query.Append($"SELECT ");
        query.Append(string.Join(", ", properties.Select(p => $"\"{p.Name}\"")));
        query.Append($" FROM \"{DB_TableName}\" WHERE ");
        query.Append(string.Join(", ", properties.Select(p => $"\"{p.Name}\" = @{p.Name}")));
        query.Append(";");


        Dictionary<string, object?>? parameters = properties.ToDictionary(
            prop => prop.Name,
            prop => prop.GetValue(this)
        );

        return new DbQuery
        {
            query = query.ToString(),
            parameters = parameters
        };

    }

}

public class DbQuery {
    public string? query { get; set; }
    public Dictionary<string, object?>? parameters { get; set; }
}
