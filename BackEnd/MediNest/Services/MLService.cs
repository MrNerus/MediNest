using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MediNest.Modals;
using Microsoft.IdentityModel.Tokens;
using Microsoft.ML;

namespace MediNest.Services;

public class MLService(IConfiguration config)
{
    private readonly IConfiguration _config = config;

    public static string PredictDoctorCategory(string symptom)
    {
        var mlContext = new MLContext();

        var modelPath = "symptom_model.zip";
        if (!File.Exists(modelPath))
        {
            throw new Exception("Model file not found.");
        }

        ITransformer model = mlContext.Model.Load(modelPath, out var _);
        var predictionEngine = mlContext.Model.CreatePredictionEngine<SymptomData, DoctorPrediction>(model);

        var result = predictionEngine.Predict(new SymptomData { SymptomText = symptom });

        return result.PredictedLabel;
    }

}