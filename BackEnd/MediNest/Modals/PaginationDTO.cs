using System;

namespace MediNest.Modals;

public class DataParamDTO
{
    public PaginationDTO? PageInfo { get; set; }
    public List<FilterDTO>? Filter { get; set; }
    public List<OrderDTO>? Order { get; set; }
}

public class PaginationDTO
{
    public int? CurrentPage { get; set; } = 1;
    public int? RowsPerPage { get; set; } = 20;
    public int? TotalRows { get; set; } = 0;
    public int? TotalPages { get; set; } = 0;
    public int? CurrentRowsPerPage { get; set; } = 0;
}

public class FilterDTO
{
    public string? Field { get; set; }
    public string? Operator { get; set; }
    public string? Value { get; set; }
}

public class OrderDTO
{
    public string? Field { get; set; }
    public string? Order { get; set; }
}
