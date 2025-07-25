using System;

namespace MediNest.Models.DTOs;


public class LoginDTO
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class UserProfileDTO
{
    public string? Username { get; set; }
    public string? Token { get; set; }
}

public class UserProfile
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Role { get; set; }
    public int? RoleId { get; set; }
    public int? LoginId { get; set; }

}
