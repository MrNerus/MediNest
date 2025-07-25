using System;
using Dapper;
using MediNest.Models.DTOs;
using MediNest.Modals.Interface;
using MediNest.Models;
using Npgsql;
using MediNest.Models.DbModels;
using MediNest.Services;

namespace MediNest.BLL;

public class MLBLL(IConfiguration configuration)
{
    private IConfiguration _configuration = configuration;
    private string _connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new Exception("Who is gonna setup the DBConnection? Me?");

    public async Task<string> GetDoctorSuggestion(string symptom)
    {
        string a = MLService.PredictDoctorCategory(symptom);
        return a;
    }
}
