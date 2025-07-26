using Microsoft.ML.Data;
namespace MediNest.Modals;

public class SymptomData
{
    public string SymptomText { get; set; }
    public string? Label { get; set; }
}

public class DoctorPrediction
{
    [ColumnName("PredictedLabel")]
    public string PredictedLabel { get; set; }
}