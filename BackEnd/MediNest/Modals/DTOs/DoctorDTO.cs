using System;

namespace MediNest.Models.DTOs;

public class DoctorDTO
{
    public string? Username { get; set; }
    public int? Id { get; set; }
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? Reputation { get; set; }
    public string? RegistrationNo { get; set; }
    public string? Qualification { get; set; }


    public List<string>? Control_RequiredOnEdit { get; set; } = ["Name", "Gender", "Phone", "Email", "Address", "RegistrationNo", "Qualification"];
    public List<string>? Control_EditabeOnEdit { get; set; } = ["Name", "Gender", "Phone", "Email", "Address", "Qualification"];
    public List<string>? Control_PostOnEdit { get; set; } = ["Id", "Name", "Gender", "Phone", "Email", "Address", "Qualification"];
}

public class NewDoctorDTO : DoctorDTO
{
    public string? Password { get; set; }
    public List<string>? Control_RequiredOnNew { get; set; } = ["Username","Password", "Name", "Gender", "Phone", "Email", "Address", "RegistrationNo", "Qualification"];
    public List<string>? Control_PostOnNew { get; set; } = ["Username", "Password", "Name", "Gender", "Phone", "Email", "Address", "RegistrationNo", "Qualification"];

}

public class ListDoctorDTO : DoctorDTO
{
    public List<string>? Control_Columns { get; set; } = ["Username", "Name", "Gender", "Phone", "Email", "Address", "RegistrationNo", "Qualification", "Reputation"];
    public List<string>? Control_SearchColumns { get; set; } = ["Username", "Name", "Phone", "Email", "RegistrationNo"];
    public List<string>? Control_IgnoreColumns { get; set; } = ["Control_Columns", "Control_SearchColumns", "Control_IgnoreColumns", "Control_RequiredOnEdit", "Control_EditabeOnEdit", "Control_RequiredOnNew", "Control_PostOnEdit", "Control_PostOnNew"];
}