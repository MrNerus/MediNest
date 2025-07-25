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
        var modelPath = Path.Combine(Environment.CurrentDirectory, "symptom_model.zip");

        ITransformer loadedModel;
        using (var stream = new FileStream(modelPath, FileMode.Open, FileAccess.Read, FileShare.Read))
        {
            loadedModel = mlContext.Model.Load(stream, out var modelInputSchema);
        }

        var predictor = mlContext.Model.CreatePredictionEngine<SymptomData, SymptomPrediction>(loadedModel);

        var prediction = predictor.Predict(new SymptomData { SymptomText = symptom });
        return prediction.PredictedLabel;
    }

}