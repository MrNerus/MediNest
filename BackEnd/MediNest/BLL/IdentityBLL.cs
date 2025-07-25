using System;
using MediNest.DAL;
using MediNest.Helpers;
using MediNest.Modals;
using MediNest.Modals.Enums;
using MediNest.Models;
using MediNest.Models.DbModels;
using MediNest.Models.DTOs;
using MediNest.Services;

namespace MediNest.BLL;

public class IdentityBLL(IdentityDAL identityDAL, JwtTokenService jwtTokenService)
{
    private IdentityDAL _identityDAL = identityDAL;
    private JwtTokenService _jwtTokenService = jwtTokenService;


    public async Task<UserProfileDTO> Login(LoginDTO loginDTO)
    {
        if (string.IsNullOrEmpty(loginDTO.Password)) throw new Exception("Password is required.");
        if (string.IsNullOrEmpty(loginDTO.Username)) throw new Exception("Username is required.");

        UserProfile user = await _identityDAL.GetUserProfile(loginDTO.Username);

        if (string.IsNullOrEmpty(user.Role)) throw new Exception("Role is not assigned.");
        if (string.IsNullOrEmpty(user.Username)) throw new Exception("Username is not found.. This should never happen, But someone has got to shut up the compiler.");
        if (string.IsNullOrEmpty(user.LoginId?.ToString())) throw new Exception("LoginId is not found.. This should never happen, But someone has got to shut up the compiler.");
        if (string.IsNullOrEmpty(user.Password)) throw new Exception("No key doesnot always mean no security. It may also mean no access.");

        if (!SecurityHelper.VerifyPassword(loginDTO.Password, user.Password)) throw new Exception("Invalid password");


        string token = _jwtTokenService.GenerateToken(user.Username, user.Role, (int)user.LoginId);

        UserProfileDTO userProfileDTO = new UserProfileDTO
        {
            Username = user.Username,
            Token = token
        };

        return userProfileDTO;
    }
}

