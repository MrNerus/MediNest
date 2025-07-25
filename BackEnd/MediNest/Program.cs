using System.Text;
using MediNest.BLL;
using MediNest.DAL;
using MediNest.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new Exception("Who is gonna setup the DBConnection? Me?");
builder.Services.AddControllers();

// Switched to the standard Swagger generator for better controller support.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        var config = builder.Configuration;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = config["JwtSettings:Issuer"],
            ValidAudience = config["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtSettings:Key"]!))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped<JwtTokenService>();

builder.Services.AddScoped<IdentityBLL>();
builder.Services.AddScoped<IdentityDAL>();
builder.Services.AddScoped<GenericBLL>();
builder.Services.AddScoped<DoctorBLL>();
builder.Services.AddScoped<DoctorDAL>();
builder.Services.AddScoped<PatientBLL>();
builder.Services.AddScoped<PatientDAL>();
builder.Services.AddScoped<HospitalBLL>();
builder.Services.AddScoped<HospitalDAL>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwagger();
}

app.UseAuthentication(); // Must come before Authorization
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();


app.Run();
