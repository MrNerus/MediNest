using System;
using Microsoft.ML;
using Microsoft.ML.Data;
using System.IO;

public class SymptomData
{
    [LoadColumn(0)]
    public string SymptomText { get; set; }

    [LoadColumn(1)]
    public string Label { get; set; }
}

class Program
{
    static void Main()
    {
        var mlContext = new MLContext();

        var filePath = Path.Combine(Environment.CurrentDirectory, "symptoms.csv");
        if (!File.Exists(filePath))
        {
            Console.WriteLine($"File not found: {filePath}");
            return;
        }

        Console.WriteLine($"📄 Reading data from '{filePath}'...");

        var data = mlContext.Data.LoadFromTextFile<SymptomData>(
            filePath,
            hasHeader: true,
            separatorChar: ',');

        var pipeline = mlContext.Transforms.Conversion
            .MapValueToKey("Label")
            .Append(mlContext.Transforms.Text.FeaturizeText("Features", "SymptomText"))
            .Append(mlContext.MulticlassClassification.Trainers.SdcaMaximumEntropy("Label", "Features"))
            .Append(mlContext.Transforms.Conversion.MapKeyToValue("PredictedLabel"));

        var model = pipeline.Fit(data);

        var modelPath = "symptom_model.zip";
        mlContext.Model.Save(model, data.Schema, modelPath);

        Console.WriteLine($"Model trained and saved to '{modelPath}'");
    }
}
