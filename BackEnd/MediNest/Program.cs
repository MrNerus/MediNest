using MediNest.BLL;
using MediNest.DAL;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);


string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new Exception("Who is gonna setup the DBConnection? Me?");
builder.Services.AddControllers();

// Switched to the standard Swagger generator for better controller support.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<GenericBLL>();
builder.Services.AddScoped<DoctorBLL>();
builder.Services.AddScoped<DoctorDAL>();
builder.Services.AddScoped<PatientBLL>();
builder.Services.AddScoped<PatientDAL>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwagger();
}

app.UseHttpsRedirection();
app.MapControllers();


app.Run();
