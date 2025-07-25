using System;

namespace MediNest.Models.DTOs;


public class PatientDTO
{
    public string? Username { get; set; }
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }

    public List<string>? Control_RequiredOnEdit { get; set; } =
        ["Name", "Gender", "Phone", "Email", "Address"];

    public List<string>? Control_EditabeOnEdit { get; set; } =
        ["Name", "Gender", "Phone", "Email", "Address"];

    public List<string>? Control_PostOnEdit { get; set; } =
        ["Id", "Name", "Gender", "Phone", "Email", "Address"];
}

public class NewPatientDTO : PatientDTO
{
    public string? Password { get; set; }

    public List<string>? Control_RequiredOnNew { get; set; } =
        ["Username", "Password", "Name", "Gender", "Phone", "Email", "Address"];

    public List<string>? Control_PostOnNew { get; set; } =
        ["Username", "Password", "Name", "Gender", "Phone", "Email", "Address"];
}

public class ListPatientDTO : PatientDTO
{
    public List<string>? Control_Columns { get; set; } =
        ["Username", "Name", "Gender", "Phone", "Email", "Address"];

    public List<string>? Control_SearchColumns { get; set; } =
        ["Username", "Name", "Phone", "Email"];

    public List<string>? Control_IgnoreColumns { get; set; } =
        [
            "Control_Columns", "Control_SearchColumns", "Control_IgnoreColumns",
            "Control_RequiredOnEdit", "Control_EditabeOnEdit",
            "Control_RequiredOnNew", "Control_PostOnEdit", "Control_PostOnNew"
        ];
}
