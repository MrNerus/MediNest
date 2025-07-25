using Microsoft.ML.Data;
namespace MediNest.Modals;

public class SymptomData
{
    public required string SymptomText { get; set; }
}

public class SymptomPrediction
{
    [ColumnName("PredictedLabel")]
    public string PredictedLabel { get; set; }
}

