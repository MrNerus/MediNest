using System;

namespace MediNest.Models.DTOs;

public class HospitalDTO
{
    public string? Username { get; set; }
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? PAN { get; set; }
    public string? Website { get; set; }

    public List<string>? Control_RequiredOnEdit { get; set; } = ["Name", "Address", "Phone", "Email", "PAN"];
    public List<string>? Control_EditabeOnEdit { get; set; } = ["Name", "Address", "Phone", "Email", "PAN", "Website"];
    public List<string>? Control_PostOnEdit { get; set; } = ["Id", "Name", "Address", "Phone", "Email", "PAN", "Website"];
}


public class NewHospitalDTO : HospitalDTO
{
    public string? Password { get; set; }
    public List<string>? Control_RequiredOnNew { get; set; } = ["Username","Password", "Name", "Address", "Phone", "Email", "PAN"];
    public List<string>? Control_PostOnNew { get; set; } = ["Username", "Password", "Name", "Address", "Phone", "Email", "PAN", "Website"];

}

public class ListHospitalDTO : HospitalDTO
{
    public List<string>? Control_Columns { get; set; } = ["Username", "Name", "Address", "Phone", "Email", "PAN", "Website"];
    public List<string>? Control_SearchColumns { get; set; } = ["Username", "Name", "Address", "Phone", "Email", "PAN", "Website"];
    public List<string>? Control_IgnoreColumns { get; set; } = ["Control_Columns", "Control_SearchColumns", "Control_IgnoreColumns", "Control_RequiredOnEdit", "Control_EditabeOnEdit", "Control_RequiredOnNew", "Control_PostOnEdit", "Control_PostOnNew"];
}